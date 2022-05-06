#!/usr/bin/env bash

# Get the comment body as a variable
COMMENT_BODY=$(cat templates/COMMENT_TEMPLATE.md)

# Replace variables in comment body
COMMENT_BODY=${COMMENT_BODY//COMMIT_SHA/$COMMIT_SHA}
COMMENT_BODY=${COMMENT_BODY//COMMIT_MESSAGE/$COMMIT_MESSAGE}
COMMENT_BODY=${COMMENT_BODY//PR_NUMBER/$PR_NUMBER}

# Display comment body to user
echo "Comment to be posted on pull request #$PR_NUMBER:"
echo "\n\n"
echo "$COMMENT_BODY"
echo "\n\n"

# Add the comment to the pull request
gh pr comment $PR_NUMBER --repo=woocommerce/woocommerce --body "$COMMENT_BODY"