const fs = require("fs");

const summary = require("../../../docs/daily/api/widgets/summary.json");
const slackMessage = fs.readFileSync("./templates/SLACK_DAILY.md").toString();

// MYTODO Place stats (from summary JSON) on slack message

console.log(slackMessage);
