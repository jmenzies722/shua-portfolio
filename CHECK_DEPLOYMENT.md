# How to Check and Deploy Your Portfolio

## Quick Check Script

Run this to verify everything is set up:

```bash
./scripts/check-setup.sh
```

## Step-by-Step Deployment

### Option 1: Automated Script (Easiest)

```bash
./scripts/deploy.sh
```

This will:
1. Check prerequisites
2. Create terraform.tfvars if needed
3. Initialize Terraform
4. Show you a plan
5. Apply the infrastructure
6. Show you the outputs for GitHub Secrets

### Option 2: Manual Steps

#### 1. Set up Terraform Configuration

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:
```hcl
aws_region   = "us-east-1"
bucket_name  = "josh-menzies-portfolio-2024"  # Must be globally unique!
domain_name  = ""
acm_certificate_arn = ""
```

**Important:** Choose a unique bucket name (e.g., `josh-menzies-portfolio-2024`)

#### 2. Initialize Terraform

```bash
terraform init
```

#### 3. Review the Plan

```bash
terraform plan
```

This shows you what will be created:
- S3 bucket
- CloudFront distribution
- IAM user for GitHub Actions
- Policies and permissions

#### 4. Apply Infrastructure

```bash
terraform apply
```

Type `yes` when prompted. This takes about 5-10 minutes.

#### 5. Save the Outputs

After `terraform apply` completes, you'll see outputs like:

```
aws_access_key_id = "AKIA..."
aws_secret_access_key = "wJalr..." (sensitive)
cloudfront_distribution_id = "E1234567890ABC"
s3_bucket_name = "your-bucket-name"
website_url = "https://abc123.cloudfront.net"
```

**Save these!** You'll need them for GitHub Secrets.

#### 6. Configure GitHub Secrets

1. Go to: `https://github.com/jmenzies722/shua-portfolio/settings/secrets/actions`
2. Click "New repository secret"
3. Add these 4 secrets:

| Secret Name | Value |
|------------|-------|
| `AWS_ACCESS_KEY_ID` | From terraform output |
| `AWS_SECRET_ACCESS_KEY` | From terraform output |
| `AWS_S3_BUCKET` | From terraform output (`s3_bucket_name`) |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | From terraform output |

#### 7. Deploy!

```bash
git push origin main
```

Or make any commit and push:
```bash
git add .
git commit -m "Trigger deployment"
git push origin main
```

#### 8. Check Deployment Status

1. Go to GitHub Actions: `https://github.com/jmenzies722/shua-portfolio/actions`
2. Click on the latest workflow run
3. Watch it build and deploy

#### 9. View Your Site

After deployment completes (check Actions tab), visit your CloudFront URL:
```bash
terraform output website_url
```

Or check the GitHub Actions output - it shows the URL.

## Verify Deployment

### Check S3 Bucket

```bash
aws s3 ls s3://your-bucket-name/
```

You should see your built files (`index.html`, `_next/`, etc.)

### Check CloudFront

```bash
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID
```

Status should be `Deployed` (takes 15-30 minutes initially)

### Test the Site

```bash
curl -I $(terraform output -raw website_url)
```

Should return `200 OK`

## Troubleshooting

### "Bucket name already exists"
- Choose a different name in `terraform.tfvars`
- Bucket names must be globally unique across all AWS accounts

### "Access Denied"
- Check AWS credentials: `aws sts get-caller-identity`
- Ensure your AWS user has permissions for:
  - S3 (create bucket, put objects)
  - CloudFront (create distribution)
  - IAM (create user, attach policies)

### GitHub Actions Fails
- Verify all 4 secrets are set correctly
- Check the Actions tab for detailed error messages
- Ensure bucket name in secret matches Terraform output

### CloudFront Takes Time
- Initial deployment: 15-30 minutes
- Check status: `aws cloudfront get-distribution --id YOUR_ID`
- Wait for status to be `Deployed`

## View Terraform Outputs Anytime

```bash
cd terraform
terraform output
```

To get specific values:
```bash
terraform output website_url
terraform output cloudfront_distribution_id
terraform output s3_bucket_name
```

## Check Infrastructure Status

```bash
# List S3 buckets
aws s3 ls | grep your-bucket-name

# Check CloudFront distributions
aws cloudfront list-distributions --query "DistributionList.Items[*].[Id,DomainName,Status]" --output table

# Check IAM user
aws iam get-user --user-name your-bucket-name-github-actions
```

## Next Deployment

After initial setup, deployments are automatic:
1. Make changes
2. `git push origin main`
3. GitHub Actions handles the rest!

No need to run Terraform again unless you change infrastructure.


