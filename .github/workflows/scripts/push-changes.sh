#!/usr/bin/env bash

#
# Pushes the newly generated report to the repo.
#

COMMIT_MESSAGE=""
EXIT_CODE=0
MAX_ATTEMPTS=10

set_commit_message() {

    case $TEST_TYPE in
    "e2e")
        COMMIT_MESSAGE="Added: E2E test report"
        ;;
    "api")
        COMMIT_MESSAGE="Added: API test report"
        ;;
    esac

    case $TEST_WORKFLOW in
    "daily")
        COMMIT_MESSAGE="$COMMIT_MESSAGE - Daily smoke test"
        ;;
    "pr")
        COMMIT_MESSAGE="$COMMIT_MESSAGE - PR $PR_NUMBER"
        ;;
    "release")
        COMMIT_MESSAGE="$COMMIT_MESSAGE - Release"
        ;;
    esac

    COMMIT_MESSAGE="$COMMIT_MESSAGE - Run $RUN_ID"
}

set_commit_message

cd $REPO_PATH
git config user.name $GH_USER
git config user.email $GH_EMAIL
git add .
git commit -m "$COMMIT_MESSAGE"

# Retry pushing changes up to 10 times when race conditions occur,
# like when multiple workflows are trying to push to the repo at the same time.
for ((i = 1; i <= $MAX_ATTEMPTS; i++)); do
    echo "Attempting to push changes (try #$i)..."
    git pull --rebase
    git push "https://$GH_TOKEN@github.com/$GITHUB_REPOSITORY"
    EXIT_CODE=$(echo $?)

    if [[ $EXIT_CODE -eq 0 ]]; then
        break
    fi

    if [[ $i -lt $MAX_ATTEMPTS ]]; then
        echo "Retrying in 5 sec..."
        sleep 5
    fi
done

exit $EXIT_CODE
