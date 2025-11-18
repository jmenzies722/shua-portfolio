#!/bin/bash

set -e

echo "🚀 Deploying Shua Portfolio to AWS"
echo ""

# Check prerequisites
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform not installed"
    exit 1
fi

if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured"
    exit 1
fi

cd terraform

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "📝 Creating terraform.tfvars..."
    cp terraform.tfvars.example terraform.tfvars
    
    echo ""
    echo "⚠️  Please edit terraform/terraform.tfvars:"
    echo "   - Set a globally unique bucket_name"
    echo "   - Set your preferred aws_region"
    echo ""
    read -p "Press Enter after editing terraform.tfvars..."
fi

# Initialize if needed
if [ ! -d ".terraform" ]; then
    echo "🔧 Initializing Terraform..."
    terraform init
fi

# Plan
echo ""
echo "📋 Planning infrastructure changes..."
terraform plan

echo ""
read -p "Continue with apply? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Cancelled."
    exit 0
fi

# Apply
echo ""
echo "🏗️  Creating infrastructure..."
terraform apply

# Show outputs
echo ""
echo "✅ Infrastructure created!"
echo ""
echo "📋 Important outputs (save these for GitHub Secrets):"
echo ""
terraform output -json | jq -r '
  "AWS_ACCESS_KEY_ID: " + .aws_access_key_id.value,
  "AWS_SECRET_ACCESS_KEY: " + .aws_secret_access_key.value,
  "AWS_S3_BUCKET: " + .s3_bucket_name.value,
  "AWS_CLOUDFRONT_DISTRIBUTION_ID: " + .cloudfront_distribution_id.value,
  "",
  "🌐 Website URL: " + .website_url.value
'

echo ""
echo "Next steps:"
echo "1. Copy the outputs above to GitHub Secrets"
echo "2. Go to: https://github.com/jmenzies722/shua-portfolio/settings/secrets/actions"
echo "3. Add the 4 secrets listed above"
echo "4. Push to main: git push origin main"


