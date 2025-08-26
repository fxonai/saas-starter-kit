#!/bin/bash

# Simple PR creation script
# Usage: ./scripts/pr.sh "PR Title" "PR Description"

if [ $# -lt 2 ]; then
    echo "Usage: $0 \"PR Title\" \"PR Description\""
    echo "Example: $0 \"Add new feature\" \"This PR adds a new feature that...\""
    exit 1
fi

TITLE="$1"
DESCRIPTION="$2"

# Run the main PR creation script
./scripts/create-pr.sh "$TITLE" "$DESCRIPTION"
