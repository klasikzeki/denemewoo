#
# Downloads a test report from the S3 bucket.
# The value of the HAS_PREVIOUS_REPORT step output will depend on whether a previously saved report was found.
#
# The following environment variables must be set in order to use this script:
# - SOURCE
# - DESTINATION
#
#!/usr/bin/env bash

aws s3 sync $SOURCE $DESTINATION

if [[ -z "$(ls $DESTINATION)" ]]; then
    echo 'HAS_PREVIOUS_REPORT=false' >> $GITHUB_OUTPUT
else
    echo 'HAS_PREVIOUS_REPORT=true' >> $GITHUB_OUTPUT
fi
