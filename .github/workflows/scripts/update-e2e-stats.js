const { google } = require('googleapis');
const data = require(process.env.E2E_SUMMARY_JSON);

// Extract the required information
const { total, skipped, broken, failed } = data.statistic;
const duration = data.time.duration;
const currentDate = new Date();
// Google Sheet ID and range
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

// Credentials and authentication
const client = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Size of test suite
async function appendSuiteSize() {
  const range = 'Size of Test Suite!A:B'; // Specify the range where you want to write the data
  try {
    // Authorize the client
    await client.authorize();

    // Create a new instance of the Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Prepare the request body
    const request = {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[currentDate, total]]
      }
    };

    // Send the request to append values to the sheet
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`${response.data.updates.updatedCells} cells appended.`);
  } catch (err) {
    console.error('Error appending to Google Sheet:', err);
  }
}

// Execution time
async function appendExecutionTime() {
  const range = 'Execution Time!A:B'; // Specify the range where you want to write the data
  try {
    // Authorize the client
    await client.authorize();

    // Create a new instance of the Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Prepare the request body
    const request = {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[currentDate, duration]]
      }
    };

    // Send the request to append values to the sheet
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`${response.data.updates.updatedCells} cells appended.`);
  } catch (err) {
    console.error('Error appending to Google Sheet:', err);
  }
}

// Failed Tests
async function appendFailures() {
  const range = 'Number of Failures!A:B'; // Specify the range where you want to write the data
  try {
    // Authorize the client
    await client.authorize();

    // Create a new instance of the Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Prepare the request body
    const request = {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[currentDate, failed]]
      }
    };

    // Send the request to append values to the sheet
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`${response.data.updates.updatedCells} cells appended.`);
  } catch (err) {
    console.error('Error appending to Google Sheet:', err);
  }
}

// Skipped Tests
async function appendSkipped() {
  const range = 'Number of Skipped!A:B'; // Specify the range where you want to write the data
  try {
    // Authorize the client
    await client.authorize();

    // Create a new instance of the Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Prepare the request body
    const request = {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[currentDate, skipped]]
      }
    };

    // Send the request to append values to the sheet
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`${response.data.updates.updatedCells} cells appended.`);
  } catch (err) {
    console.error('Error appending to Google Sheet:', err);
  }
}

// Skipped Tests
async function appendBroken() {
  const range = 'Number of Broken!A:B'; // Specify the range where you want to write the data
  try {
    // Authorize the client
    await client.authorize();

    // Create a new instance of the Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Prepare the request body
    const request = {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[currentDate, broken]]
      }
    };

    // Send the request to append values to the sheet
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`${response.data.updates.updatedCells} cells appended.`);
  } catch (err) {
    console.error('Error appending to Google Sheet:', err);
  }
}

// Size of test suite only measured on the first of the month
if (currentDate.getDate() === 1) {
  // Call the append function
  appendSuiteSize();
} else {
  console.log('Not the first day of the month. Skipping the execution.');
}

// Everything else runs daily
appendExecutionTime();
appendFailures();
appendSkipped();
appendBroken();