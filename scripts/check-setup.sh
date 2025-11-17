#!/bin/bash

echo "🔍 Checking deployment setup..."
echo ""

# Check AWS CLI
echo "1. Checking AWS CLI..."
if command -v aws &> /dev/null; then
    echo "   ✅ AWS CLI installed: $(aws --version)"
else
    echo "   ❌ AWS CLI not installed"
    exit 1
fi

# Check AWS credentials
echo "2. Checking AWS credentials..."
if aws sts get-caller-identity &> /dev/null; then
    ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
    USER=$(aws sts get-caller-identity --query Arn --output text)
    echo "   ✅ AWS credentials configured"
    echo "   📋 Account: $ACCOUNT"
    echo "   👤 User: $USER"
else
    echo "   ❌ AWS credentials not configured"
    echo "   Run: aws configure"
    exit 1
fi

# Check Terraform
echo "3. Checking Terraform..."
if command -v terraform &> /dev/null; then
    echo "   ✅ Terraform installed: $(terraform version | head -1)"
else
    echo "   ❌ Terraform not installed"
    echo "   Install: brew install terraform"
    exit 1
fi

# Check terraform.tfvars
echo "4. Checking Terraform configuration..."
if [ -f "terraform/terraform.tfvars" ]; then
    echo "   ✅ terraform.tfvars exists"
    BUCKET=$(grep bucket_name terraform/terraform.tfvars | cut -d'"' -f2)
    if [ ! -z "$BUCKET" ]; then
        echo "   📦 Bucket name: $BUCKET"
    fi
else
    echo "   ⚠️  terraform.tfvars not found"
    echo "   Run: cp terraform/terraform.tfvars.example terraform/terraform.tfvars"
    echo "   Then edit it with your bucket name"
fi

# Check if terraform is initialized
echo "5. Checking Terraform initialization..."
if [ -d "terraform/.terraform" ]; then
    echo "   ✅ Terraform initialized"
else
    echo "   ⚠️  Terraform not initialized"
    echo "   Run: cd terraform && terraform init"
fi

# Check GitHub secrets (if we can access GitHub CLI)
echo "6. Checking GitHub setup..."
if command -v gh &> /dev/null; then
    if gh auth status &> /dev/null; then
        echo "   ✅ GitHub CLI authenticated"
        REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "unknown")
        echo "   📦 Repository: $REPO"
    else
        echo "   ⚠️  GitHub CLI not authenticated"
        echo "   Run: gh auth login"
    fi
else
    echo "   ⚠️  GitHub CLI not installed (optional)"
fi

echo ""
echo "✅ Setup check complete!"
echo ""
echo "Next steps:"
echo "1. cd terraform"
echo "2. terraform plan  (review changes)"
echo "3. terraform apply (create infrastructure)"
echo "4. Copy outputs to GitHub Secrets"
echo "5. git push origin main (trigger deployment)"

