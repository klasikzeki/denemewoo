const fs = require("fs");
const { COMMIT_MESSAGE } = process.env;
const slackMessageTemplate = fs
  .readFileSync("./templates/SLACK_DAILY.json")
  .toString();

const getStats = (summaryPath) => {
  const summary = require(summaryPath);
  const { failed, broken, skipped, passed, unknown, total } = summary.statistic;
  const { duration } = summary.time;
  const durationMinutes = Math.floor(duration / 60000);
  const durationSeconds = Math.floor((duration / 1000) % 60);
  const durationFormatted = (
    durationMinutes > 0 ? `${durationMinutes}m ` : ""
  ).concat(`${durationSeconds}s`);

  return {
    passed,
    failed,
    skipped,
    broken,
    unknown,
    total,
    durationFormatted,
  };
};

const apiSummaryJSONPath = "../../../docs/daily/api/widgets/summary.json";
const {
  passed: passedApi,
  failed: failedApi,
  skipped: skippedApi,
  broken: brokenApi,
  unknown: unknownApi,
  total: totalApi,
  durationFormatted: durationApi,
} = getStats(apiSummaryJSONPath);

const slackMessage = slackMessageTemplate
  .replace(/\$COMMIT_MESSAGE/g, COMMIT_MESSAGE)
  .replace(/\$PASSED_API/g, passedApi)
  .replace(/\$FAILED_API/g, failedApi)
  .replace(/\$SKIPPED_API/g, skippedApi)
  .replace(/\$BROKEN_API/g, brokenApi)
  .replace(/\$UNKNOWN_API/g, unknownApi)
  .replace(/\$TOTAL_API/g, totalApi)
  .replace(/\$DURATION_API/g, durationApi);

console.log(slackMessage);
