# 🎓 GradVault

A secure digital document management system for organizing and storing academic materials using AWS S3, Terraform, and React.

## 🚀 Features
- Upload and organize academic documents by semester
- Categorize materials (assignments, projects, research papers)
- Secure cloud storage with AWS S3
- Cost-effective local frontend deployment

## 🛠️ Tech Stack
- Frontend: React + Material-UI
- Cloud: AWS (S3)
- IaC: Terraform
- CI/CD: GitHub Actions

## 📋 Prerequisites
- AWS Account and CLI configured
- Node.js (v14+)
- Terraform installed
- Git

## 🔧 Quick Start
Clone the repository

    git clone https://github.com/yourusername/grad-vault.git

    cd grad-vault

Setup frontend

    cd frontend

    npm install

    Create .env file in frontend directory
    Include these below: 
    REACT_APP_AWS_REGION=us-east-1
    REACT_APP_AWS_ACCESS_KEY_ID=your_access_key
    REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_key
    REACT_APP_S3_BUCKET=bucket_name

    Start the application
    npm start

## ⚙️ Infrastructure Management
Infrastructure deploys automatically on main branch merges
To destroy infrastructure:
1. Navigate to GitHub Actions
2. Select "Terraform CI/CD"
3. Choose "Run workflow"
4. Select "destroy"
5. Confirm "Run workflow"

## Important Notes

Never commit .env file
Run terraform destroy when not in use to avoid charges
Configure CORS for localhost:3000