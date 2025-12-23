# gitActionTest

A repository for testing GitHub Actions pipeline functionality.

## GitHub Actions Workflow

This repository includes a comprehensive GitHub Actions workflow that demonstrates:

- **Automated Testing**: Runs Python tests on every push and pull request
- **Multi-Job Pipeline**: Demonstrates job dependencies and workflow orchestration
- **Artifact Management**: Creates, uploads, and downloads build artifacts
- **Conditional Deployment**: Simulates deployment only on push events

### Workflow Jobs

1. **test-job**: Runs Python tests and shell scripts
2. **lint-job**: Validates repository structure and files
3. **build-job**: Creates build artifacts (depends on test-job and lint-job)
4. **deploy-job**: Simulates deployment using artifacts (depends on build-job)

### Triggering the Workflow

The workflow is triggered on:
- Push to `main`, `master`, or `copilot/**` branches
- Pull requests to `main` or `master` branches
- Manual workflow dispatch

### Files

- `.github/workflows/test-pipeline.yml` - Main workflow configuration
- `test_script.py` - Python test suite
- `hello.sh` - Shell script for testing bash execution

## Running Tests Locally

You can run the tests locally:

```bash
# Run Python tests
python test_script.py

# Run shell script
chmod +x hello.sh
./hello.sh
```

## Viewing Workflow Results

Check the "Actions" tab in GitHub to see workflow runs and results.