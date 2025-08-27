#!/bin/bash

# Create PR script for fxonai/saas-starter-kit
# This script automates PR creation to avoid GitHub CLI prompts

set -e  # Exit on any error

# Configuration
REPO="fxonai/saas-starter-kit"
DEFAULT_ASSIGNEE="delphimon"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository"
    exit 1
fi

# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" = "main" ]; then
    print_error "Cannot create PR from main branch"
    exit 1
fi

print_status "Creating PR for branch: $CURRENT_BRANCH"

# Check if branch exists on remote
if ! git ls-remote --heads origin "$CURRENT_BRANCH" | grep -q "$CURRENT_BRANCH"; then
    print_status "Pushing branch to origin..."
    git push -u origin "$CURRENT_BRANCH"
fi

# Get commit messages for PR description
COMMIT_MESSAGES=$(git log --oneline main..HEAD | head -5)

# Create PR using GitHub CLI with explicit repo specification
print_status "Creating pull request..."

# Create the PR with explicit repo and assignee
gh pr create \
    --repo "$REPO" \
    --title "$1" \
    --body "$2" \
    --assignee "$DEFAULT_ASSIGNEE" \
    --base main

print_status "Pull request created successfully!"
print_status "Branch: $CURRENT_BRANCH"
print_status "Repository: $REPO"
print_status "Assignee: $DEFAULT_ASSIGNEE"

# Show recent commits
echo ""
print_status "Recent commits:"
echo "$COMMIT_MESSAGES"
