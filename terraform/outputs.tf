output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.portfolio.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.portfolio.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.portfolio.domain_name
}

output "cloudfront_distribution_arn" {
  description = "CloudFront distribution ARN"
  value       = aws_cloudfront_distribution.portfolio.arn
}

output "website_url" {
  description = "Website URL"
  value       = "https://${aws_cloudfront_distribution.portfolio.domain_name}"
}

output "aws_access_key_id" {
  description = "AWS Access Key ID for GitHub Actions"
  value       = aws_iam_access_key.github_actions.id
  sensitive   = true
}

output "aws_secret_access_key" {
  description = "AWS Secret Access Key for GitHub Actions"
  value       = aws_iam_access_key.github_actions.secret
  sensitive   = true
}


