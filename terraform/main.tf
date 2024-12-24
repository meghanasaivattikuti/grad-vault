provider "aws" {
  region = "us-east-1"  
}

# S3 bucket for storing files
resource "aws_s3_bucket" "grad_vault" {
  bucket = "grad-vault-storage-${var.environment}"
}

# Enable versioning
resource "aws_s3_bucket_versioning" "grad_vault" {
  bucket = aws_s3_bucket.grad_vault.id
  versioning_configuration {
    status = "Enabled"
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