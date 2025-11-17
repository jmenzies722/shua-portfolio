# Terraform Infrastructure for Shua Portfolio

This directory contains Terraform configuration for deploying the Shua Portfolio to AWS using S3 and CloudFront.

## Prerequisites

1. **AWS CLI installed and configured**
   ```bash
   aws configure
   ```

2. **Terraform installed** (>= 1.0)
   ```bash
   brew install terraform  # macOS
   # or download from https://www.terraform.io/downloads
   ```

3. **AWS credentials** with permissions to create:
   - S3 buckets
   - CloudFront distributions
   - IAM users and policies
   - ACM certificates (if using custom domain)

## Setup

1. **Copy the example variables file:**
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Edit `terraform.tfvars` with your values:**
   ```hcl
   aws_region   = "us-east-1"
   bucket_name  = "your-unique-bucket-name-shua-portfolio"
   domain_name  = "" # Optional
   acm_certificate_arn = "" # Optional
   ```

   **Important:** The bucket name must be globally unique across all AWS accounts.

3. **Initialize Terraform:**
   ```bash
   terraform init
   ```

4. **Review the plan:**
   ```bash
   terraform plan
   ```

5. **Apply the infrastructure:**
   ```bash
   terraform apply
   ```

6. **Save the outputs:**
   After applying, Terraform will output:
   - `aws_access_key_id` - For GitHub Actions secret
   - `aws_secret_access_key` - For GitHub Actions secret
   - `cloudfront_distribution_id` - For GitHub Actions secret
   - `s3_bucket_name` - For GitHub Actions secret
   - `website_url` - Your CloudFront URL

## GitHub Actions Setup

1. **Go to your GitHub repository settings**
   - Navigate to: Settings → Secrets and variables → Actions

2. **Add the following secrets:**
   - `AWS_ACCESS_KEY_ID` - From Terraform output
   - `AWS_SECRET_ACCESS_KEY` - From Terraform output
   - `AWS_S3_BUCKET` - From Terraform output (`s3_bucket_name`)
   - `AWS_CLOUDFRONT_DISTRIBUTION_ID` - From Terraform output (`cloudfront_distribution_id`)

3. **Push to main branch:**
   ```bash
   git push origin main
   ```

   The GitHub Actions workflow will automatically:
   - Build your Next.js app
   - Deploy to S3
   - Invalidate CloudFront cache

## Custom Domain (Optional)

If you want to use a custom domain:

1. **Request an ACM certificate** in `us-east-1` (required for CloudFront):
   ```bash
   aws acm request-certificate \
     --domain-name portfolio.yourdomain.com \
     --validation-method DNS \
     --region us-east-1
   ```

2. **Validate the certificate** by adding DNS records

3. **Update `terraform.tfvars`:**
   ```hcl
   domain_name = "portfolio.yourdomain.com"
   acm_certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/abc123..."
   ```

4. **Apply Terraform:**
   ```bash
   terraform apply
   ```

5. **Create Route53 record** (or DNS provider):
   - Type: CNAME
   - Name: portfolio.yourdomain.com
   - Value: CloudFront domain name (from Terraform output)

## Destroying Infrastructure

To remove all resources:
```bash
terraform destroy
```

**Warning:** This will delete your S3 bucket and all its contents!

## Outputs

After applying, you can view outputs:
```bash
terraform output
```

To get specific outputs:
```bash
terraform output cloudfront_domain_name
terraform output website_url
```

## Troubleshooting

### Bucket name already exists
- Choose a different globally unique bucket name

### CloudFront distribution takes time
- CloudFront distributions can take 15-30 minutes to deploy
- Check status: `aws cloudfront get-distribution --id <DISTRIBUTION_ID>`

### Permission errors
- Ensure your AWS credentials have the necessary permissions
- Check IAM policies for S3, CloudFront, and IAM permissions

