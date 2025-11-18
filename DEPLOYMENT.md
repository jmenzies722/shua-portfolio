# Deployment Guide

This guide explains how to deploy the Shua Portfolio to AWS using Terraform and GitHub Actions.

## Quick Start

### 1. Initial Infrastructure Setup

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your bucket name
terraform init
terraform plan
terraform apply
```

### 2. Configure GitHub Secrets

After Terraform applies successfully, copy the outputs and add them as GitHub secrets:

1. Go to: `https://github.com/jmenzies722/shua-portfolio/settings/secrets/actions`
2. Add these secrets:
   - `AWS_ACCESS_KEY_ID` - From Terraform output
   - `AWS_SECRET_ACCESS_KEY` - From Terraform output  
   - `AWS_S3_BUCKET` - From Terraform output (`s3_bucket_name`)
   - `AWS_CLOUDFRONT_DISTRIBUTION_ID` - From Terraform output

### 3. Deploy

Push to main branch:
```bash
git push origin main
```

GitHub Actions will automatically:
- Build the Next.js app
- Deploy to S3
- Invalidate CloudFront cache

## Manual Deployment

If you want to deploy manually:

```bash
# Build
npm run build

# Deploy to S3
aws s3 sync out/ s3://your-bucket-name/ --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Architecture

- **S3 Bucket**: Stores static website files
- **CloudFront**: CDN for fast global delivery
- **GitHub Actions**: CI/CD pipeline for automated deployments
- **Terraform**: Infrastructure as Code

## Cost Estimation

- **S3**: ~$0.023 per GB/month (first 50 TB)
- **CloudFront**: ~$0.085 per GB (first 10 TB)
- **Data Transfer**: ~$0.09 per GB (out to internet)

For a typical portfolio site: **~$1-5/month**

## Monitoring

Check CloudFront metrics:
```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --dimensions Name=DistributionId,Value=YOUR_DISTRIBUTION_ID \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600 \
  --statistics Sum
```


