# Development Scripts

This directory contains helpful scripts for development workflow.

## PR Creation Scripts

### `pr.sh` - Simple PR Creation
**Usage:** `./scripts/pr.sh "PR Title" "PR Description"`

**Example:**
```bash
./scripts/pr.sh "Add new feature" "This PR adds a new feature that improves user experience"
```

### `create-pr.sh` - Full PR Creation Script
**Usage:** `./scripts/create-pr.sh "PR Title" "PR Description"`

This script:
- ✅ Checks if you're on a feature branch (not main)
- ✅ Pushes the branch to origin if needed
- ✅ Creates a PR with explicit repository specification
- ✅ Automatically assigns to @delphimon
- ✅ Shows recent commits
- ✅ Avoids GitHub CLI prompts

## Features

- **No prompts**: Bypasses GitHub CLI confirmation dialogs
- **Auto-assignment**: Automatically assigns PRs to @delphimon
- **Error handling**: Validates git repository and branch status
- **Colored output**: Clear status messages with colors
- **Repository config**: Hardcoded to use `fxonai/saas-starter-kit`

## Configuration

The scripts are configured for:
- **Repository**: `fxonai/saas-starter-kit`
- **Default assignee**: `@delphimon`
- **Base branch**: `main`

## Requirements

- Git repository
- GitHub CLI installed
- Feature branch (not main)
- Commits ready to push
