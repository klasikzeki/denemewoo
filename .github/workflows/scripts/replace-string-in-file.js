const { readFileSync, writeFileSync } = require("fs");

const args = process.argv.slice(2);
const file = args[0];
const searchValue = args[1];
const replacement = args[2];

const content = readFileSync(file);
const newFileContent = content.toString().replace(searchValue, replacement);

writeFileSync(file, newFileContent);
