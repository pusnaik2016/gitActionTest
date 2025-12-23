#!/bin/bash
# Simple shell script to test bash execution in the pipeline

echo "=========================================="
echo "Hello from GitHub Actions Pipeline!"
echo "=========================================="
echo ""
echo "Script executed at: $(date)"
echo "Current directory: $(pwd)"
echo "User: $(whoami)"
echo ""
echo "Pipeline test successful! ✓"
