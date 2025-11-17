#!/bin/bash

# Script to set up GitHub Secrets for AWS deployment
# Run this script to automatically add all required secrets

set -e

echo "🔐 Setting up GitHub Secrets for AWS Deployment"
echo "================================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Install it with: brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI."
    echo "Run: gh auth login"
    exit 1
fi

# Get values from Terraform
cd "$(dirname "$0")/../terraform" || exit 1

echo "📦 Getting values from Terraform..."
AWS_ACCESS_KEY_ID=$(terraform output -raw aws_access_key_id 2>/dev/null || echo "")
AWS_SECRET_ACCESS_KEY=$(terraform output -raw aws_secret_access_key 2>/dev/null || echo "")
S3_BUCKET=$(terraform output -raw s3_bucket_name 2>/dev/null || echo "")
CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "❌ Could not get AWS credentials from Terraform."
    echo "Make sure Terraform has been applied: cd terraform && terraform apply"
    exit 1
fi

echo "✅ Got values from Terraform"
echo ""

# Set secrets
echo "🔑 Setting GitHub Secrets..."
gh secret set AWS_ACCESS_KEY_ID --body "$AWS_ACCESS_KEY_ID"
echo "✅ Set AWS_ACCESS_KEY_ID"

gh secret set AWS_SECRET_ACCESS_KEY --body "$AWS_SECRET_ACCESS_KEY"
echo "✅ Set AWS_SECRET_ACCESS_KEY"

gh secret set AWS_S3_BUCKET --body "$S3_BUCKET"
echo "✅ Set AWS_S3_BUCKET"

gh secret set AWS_CLOUDFRONT_DISTRIBUTION_ID --body "$CLOUDFRONT_ID"
echo "✅ Set AWS_CLOUDFRONT_DISTRIBUTION_ID"

echo ""
echo "🎉 All secrets have been set successfully!"
echo ""
echo "📋 Summary:"
echo "  - AWS_ACCESS_KEY_ID: ✅"
echo "  - AWS_SECRET_ACCESS_KEY: ✅"
echo "  - AWS_S3_BUCKET: ✅ ($S3_BUCKET)"
echo "  - AWS_CLOUDFRONT_DISTRIBUTION_ID: ✅ ($CLOUDFRONT_ID)"
echo ""
echo "🚀 Next step: Push to main branch to trigger deployment"
echo "   git push origin main"

