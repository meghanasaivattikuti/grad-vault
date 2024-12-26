terraform {
  backend "s3" {
    bucket = "grad-vault-tfstate"
    key    = "terraform.tfstate"
    region = "us-west-1"
    encrypt = true
  }
}