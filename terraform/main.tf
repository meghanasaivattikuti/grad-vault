provider "aws" {
  region = "us-east-1"  
}
# S3 bucket
resource "aws_s3_bucket" "grad_vault" {
  bucket = "grad-vault-storage-dev"
  force_destroy = true  # This allows terraform to empty the bucket when destroying
}

# Enable versioning
resource "aws_s3_bucket_versioning" "grad_vault" {
  bucket = aws_s3_bucket.grad_vault.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Disable block public access
resource "aws_s3_bucket_public_access_block" "grad_vault" {
  bucket = aws_s3_bucket.grad_vault.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Add bucket policy
resource "aws_s3_bucket_policy" "allow_access" {
  depends_on = [aws_s3_bucket_public_access_block.grad_vault]
  bucket = aws_s3_bucket.grad_vault.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadGetObject"
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.grad_vault.arn}/*"
      },
    ]
  })
}

# CORS configuration
resource "aws_s3_bucket_cors_configuration" "grad_vault" {
  bucket = aws_s3_bucket.grad_vault.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE", "HEAD"]
    allowed_origins = ["http://localhost:3000"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# DynamoDB table for metadata
resource "aws_dynamodb_table" "grad_vault_metadata" {
  name           = "grad-vault-metadata-${var.environment}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  range_key      = "semester"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "semester"
    type = "S"
  }
}

# Add IAM role and policy
resource "aws_iam_role" "grad_vault_role" {
  name = "grad_vault_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}



