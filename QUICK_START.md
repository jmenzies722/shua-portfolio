# Quick Start Guide - AWS Deployment

## Prerequisites Checklist

- [ ] AWS CLI installed (`aws --version`)
- [ ] AWS credentials configured (`aws configure`)
- [ ] Terraform installed (`terraform --version`)
- [ ] GitHub repository created

## Step-by-Step Deployment

### 1. Initialize Terraform (5 minutes)

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:
```hcl
aws_region   = "us-east-1"
bucket_name  = "your-unique-bucket-name-shua-portfolio"  # Must be globally unique!
domain_name  = ""  # Leave empty for now
acm_certificate_arn = ""  # Leave empty for now
```

**Important:** Choose a globally unique bucket name (e.g., `josh-menzies-portfolio-2024`)

### 2. Create Infrastructure (10 minutes)

```bash
terraform init
terraform plan  # Review what will be created
terraform apply  # Type 'yes' when prompted
```

**Save the outputs!** You'll need them for GitHub Secrets:
- `aws_access_key_id`
- `aws_secret_access_key`
- `cloudfront_distribution_id`
- `s3_bucket_name`

### 3. Configure GitHub Secrets (2 minutes)

1. Go to: `https://github.com/jmenzies722/shua-portfolio/settings/secrets/actions`
2. Click "New repository secret"
3. Add these 4 secrets:

| Secret Name | Value Source |
|------------|--------------|
| `AWS_ACCESS_KEY_ID` | Terraform output: `aws_access_key_id` |
| `AWS_SECRET_ACCESS_KEY` | Terraform output: `aws_secret_access_key` |
| `AWS_S3_BUCKET` | Terraform output: `s3_bucket_name` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | Terraform output: `cloudfront_distribution_id` |

### 4. Deploy! (Automatic)

```bash
git add .
git commit -m "Add Terraform infrastructure and CI/CD"
git push origin main
```

GitHub Actions will automatically:
1. ✅ Build your Next.js app
2. ✅ Deploy to S3
3. ✅ Invalidate CloudFront cache

### 5. View Your Site

After deployment completes (check GitHub Actions tab), visit:
```
https://YOUR_CLOUDFRONT_DISTRIBUTION_ID.cloudfront.net
```

Or get the URL from Terraform:
```bash
terraform output website_url
```

## Troubleshooting

### "Bucket name already exists"
- Choose a different, globally unique bucket name

### "Access Denied" errors
- Check AWS credentials: `aws sts get-caller-identity`
- Ensure your AWS user has S3, CloudFront, and IAM permissions

### GitHub Actions fails
- Verify all 4 secrets are set correctly
- Check the Actions tab for detailed error messages
- Ensure bucket name matches the secret

### CloudFront takes time
- CloudFront distributions take 15-30 minutes to fully deploy
- Be patient! Check status: `aws cloudfront get-distribution --id YOUR_ID`

## Next Steps

- [ ] Test the deployed site
- [ ] Set up custom domain (optional - see terraform/README.md)
- [ ] Monitor CloudWatch metrics
- [ ] Set up alerts for failures

## Cost Estimate

- **S3 Storage**: ~$0.023/GB/month
- **CloudFront**: ~$0.085/GB transfer
- **Typical portfolio**: **$1-5/month**

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed documentation.

