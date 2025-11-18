#!/bin/bash

set -e

echo "🚀 Setting up Terraform infrastructure for Shua Portfolio"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   https://aws.amazon.com/cli/"
    exit 1
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install it first:"
    echo "   brew install terraform  # macOS"
    echo "   https://www.terraform.io/downloads"
    exit 1
fi

# Check AWS credentials
echo "🔍 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run:"
    echo "   aws configure"
    exit 1
fi

echo "✅ AWS credentials configured"
echo ""

# Navigate to terraform directory
cd terraform

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "📝 Creating terraform.tfvars from example..."
    cp terraform.tfvars.example terraform.tfvars
    
    echo ""
    echo "⚠️  Please edit terraform/terraform.tfvars with your values:"
    echo "   - bucket_name: Must be globally unique"
    echo "   - aws_region: Your preferred AWS region"
    echo ""
    read -p "Press Enter after editing terraform.tfvars to continue..."
fi

# Initialize Terraform
echo "🔧 Initializing Terraform..."
terraform init

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Review the plan: terraform plan"
echo "2. Apply infrastructure: terraform apply"
echo "3. Copy outputs to GitHub Secrets (see DEPLOYMENT.md)"
echo ""


