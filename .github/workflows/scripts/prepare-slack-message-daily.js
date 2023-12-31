const { readFileSync } = require('fs');
const { RUN_ID, API_SUMMARY_JSON, E2E_SUMMARY_JSON } = process.env;
const SLACK_MESSAGE_TEMPLATE = readFileSync(
  './templates/SLACK_DAILY.json'
).toString();

const getStats = (summaryPath) => {
  const summary = require(summaryPath);
  const { failed, broken, skipped, passed, unknown, total } = summary.statistic;
  const { duration } = summary.time;
  const durationMinutes = Math.floor(duration / 60000);
  const durationSeconds = Math.floor((duration / 1000) % 60);
  const durationFormatted = (
    durationMinutes > 0 ? `${durationMinutes}m ` : ''
  ).concat(`${durationSeconds}s`);

  return {
    passed,
    failed,
    skipped,
    broken,
    unknown,
    total,
    durationFormatted
  };
};

const getFormattedDate = () => {
  const date = new Date();
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const {
  passed: passedApi,
  failed: failedApi,
  skipped: skippedApi,
  broken: brokenApi,
  unknown: unknownApi,
  total: totalApi,
  durationFormatted: durationApi
} = getStats(API_SUMMARY_JSON);

const {
  passed: passedE2E,
  failed: failedE2E,
  skipped: skippedE2E,
  broken: brokenE2E,
  unknown: unknownE2E,
  total: totalE2E,
  durationFormatted: durationE2E
} = getStats(E2E_SUMMARY_JSON);

const HEADER_DATE = getFormattedDate();

const slackMessage = SLACK_MESSAGE_TEMPLATE.replace(/\$DATE/g, HEADER_DATE)
  .replace(/\$RUN_ID/g, RUN_ID)
  .replace(/\$PASSED_API/g, passedApi)
  .replace(/\$FAILED_API/g, failedApi)
  .replace(/\$SKIPPED_API/g, skippedApi)
  .replace(/\$BROKEN_API/g, brokenApi)
  .replace(/\$UNKNOWN_API/g, unknownApi)
  .replace(/\$TOTAL_API/g, totalApi)
  .replace(/\$DURATION_API/g, durationApi)
  .replace(/\$PASSED_E2E/g, passedE2E)
  .replace(/\$FAILED_E2E/g, failedE2E)
  .replace(/\$SKIPPED_E2E/g, skippedE2E)
  .replace(/\$BROKEN_E2E/g, brokenE2E)
  .replace(/\$UNKNOWN_E2E/g, unknownE2E)
  .replace(/\$TOTAL_E2E/g, totalE2E)
  .replace(/\$DURATION_E2E/g, durationE2E);

console.log(slackMessage);
