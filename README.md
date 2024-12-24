# grad-vault

## Infrastructure Management
- Infrastructure is automatically deployed when changes are merged to main
- To destroy infrastructure:
  1. Go to Actions tab in GitHub
  2. Select "Terraform CI/CD"
  3. Click "Run workflow"
  4. Select "destroy" from dropdown
  5. Click "Run workflow"

## CI/CD Pipeline
- Automated Terraform deployment on main branch
- Manual destroy option via GitHub Actions