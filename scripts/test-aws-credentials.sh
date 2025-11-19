#!/bin/bash

# Test AWS Credentials and Permissions
# This script helps verify that your AWS credentials work and have the required permissions

set -e

echo "🔍 Testing AWS Credentials and Permissions..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Testing AWS credentials...${NC}"
if aws sts get-caller-identity &> /dev/null; then
    echo -e "${GREEN}✅ AWS credentials are valid${NC}"
    aws sts get-caller-identity
else
    echo -e "${RED}❌ AWS credentials are invalid or expired${NC}"
    echo "Please check your AWS credentials:"
    echo "  - Run: aws configure"
    echo "  - Or set environment variables: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 2: Checking required values...${NC}"

# Get values from terraform output or use defaults
S3_BUCKET="${AWS_S3_BUCKET:-josh-menzies-shua-portfolio-2024}"
CLOUDFRONT_ID="${AWS_CLOUDFRONT_DISTRIBUTION_ID:-ETU31L4G0Q5BE}"
AWS_REGION="${AWS_REGION:-us-east-1}"

echo "S3 Bucket: $S3_BUCKET"
echo "CloudFront Distribution ID: $CLOUDFRONT_ID"
echo "AWS Region: $AWS_REGION"

echo ""
echo -e "${YELLOW}Step 3: Testing S3 permissions...${NC}"

# Test S3 ListBucket
if aws s3 ls "s3://$S3_BUCKET" &> /dev/null; then
    echo -e "${GREEN}✅ S3 ListBucket permission: OK${NC}"
else
    echo -e "${RED}❌ S3 ListBucket permission: FAILED${NC}"
    echo "   Error: Cannot list bucket contents"
fi

# Test S3 PutObject (by checking if we can head the bucket)
if aws s3api head-bucket --bucket "$S3_BUCKET" &> /dev/null; then
    echo -e "${GREEN}✅ S3 Bucket access: OK${NC}"
else
    echo -e "${RED}❌ S3 Bucket access: FAILED${NC}"
    echo "   Error: Cannot access bucket"
fi

# Test S3 PutObject with a test file
TEST_FILE="/tmp/test-aws-permissions.txt"
echo "test" > "$TEST_FILE"
if aws s3 cp "$TEST_FILE" "s3://$S3_BUCKET/test-permissions.txt" &> /dev/null; then
    echo -e "${GREEN}✅ S3 PutObject permission: OK${NC}"
    # Clean up test file
    aws s3 rm "s3://$S3_BUCKET/test-permissions.txt" &> /dev/null || true
else
    echo -e "${RED}❌ S3 PutObject permission: FAILED${NC}"
    echo "   Error: Cannot upload to bucket"
fi
rm -f "$TEST_FILE"

echo ""
echo -e "${YELLOW}Step 4: Testing CloudFront permissions...${NC}"

# Test CloudFront GetDistribution
if aws cloudfront get-distribution --id "$CLOUDFRONT_ID" &> /dev/null; then
    echo -e "${GREEN}✅ CloudFront GetDistribution permission: OK${NC}"
else
    echo -e "${RED}❌ CloudFront GetDistribution permission: FAILED${NC}"
    echo "   Error: Cannot access CloudFront distribution"
fi

# Test CloudFront CreateInvalidation (dry run by checking if we can describe it)
if aws cloudfront get-distribution-config --id "$CLOUDFRONT_ID" &> /dev/null; then
    echo -e "${GREEN}✅ CloudFront configuration access: OK${NC}"
    echo -e "${YELLOW}⚠️  Note: CreateInvalidation will be tested during actual deployment${NC}"
else
    echo -e "${RED}❌ CloudFront configuration access: FAILED${NC}"
fi

echo ""
echo -e "${YELLOW}Step 5: Summary of required GitHub Secrets${NC}"
echo ""
echo "Make sure these secrets are set in GitHub:"
echo "  Repository → Settings → Secrets and variables → Actions"
echo ""
echo "Required secrets:"
echo "  AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id 2>/dev/null || echo 'YOUR_ACCESS_KEY_ID')"
echo "  AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key 2>/dev/null | sed 's/./*/g' || echo 'YOUR_SECRET_ACCESS_KEY')"
echo "  AWS_S3_BUCKET=$S3_BUCKET"
echo "  AWS_CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_ID"
echo ""

echo -e "${GREEN}✅ Credential test complete!${NC}"
echo ""
echo "If any tests failed, check your IAM user permissions."
echo "Required IAM permissions:"
echo "  - s3:PutObject"
echo "  - s3:GetObject"
echo "  - s3:DeleteObject"
echo "  - s3:ListBucket"
echo "  - cloudfront:CreateInvalidation"
echo "  - cloudfront:GetDistribution"
echo "  - cloudfront:GetDistributionConfig"

