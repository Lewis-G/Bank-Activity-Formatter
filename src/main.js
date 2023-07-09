const fs = require('fs');
const BankCategory = require('./bank-category');

let configData, configJson;

// Read the config.json file
try {
  configJson = fs.readFileSync('config.json', 'utf-8');
  configData = JSON.parse(configJson);
} catch (error) {
  console.error(`Error reading or parsing the JSON file: ${error}`);
  return;
}

let myInput, myOutput;
let keysArray = [];
myInput = configData.csvInput;
myOutput = configData.txtOutput;

keysArray = Object.keys(configData.Categories);

if (keysArray.length === 0) {
  console.log("No categories found. Exiting ...");
  return;
}

// Create array of BankCateogry objects
let categories = [];
for (i = 0; i < keysArray.length; i++) {

  categories.push(new BankCategory(keysArray[i], configData.Categories[keysArray[i]]));
}

let tempRowSplit, tempDate, tempValue, tempRowRemainder;
let includesKeyword = false;

let inputData = "";

// Read the input file
try {
  inputData = fs.readFileSync(myInput, 'utf-8');
} catch (error) {
  console.error(`Error reading or parsing the JSON file: ${error}`);
  return;
}

// Iterate through input data
for (let row of inputData.split("\n")) {

  if (row.includes(",")) {

    tempRowSplit = row.split(`","`);

    tempDate = tempRowSplit[0].substring(1);
    tempValue = parseFloat(tempRowSplit[1]);
    console.log(tempValue);

    tempRowRemainder = `"${tempRowSplit[2]}`;

    // If additional columns exist they are added to the remainder
    for (let i = 3; i < tempRowSplit.length; i++) {
      tempRowRemainder += `, "${tempRowSplit[i]}"`;
    }

    // Check row information for keywords
    // CHANGE TO A FOR EACH LOOP
    // Do I need === false?
    for (let i = 0; i < categories.length || includesKeyword === false; i++) {

      if (categories[i].compareToKeywords(tempRowRemainder)) {
        categories[i].addToLog(tempDate, tempValue, tempRowRemainder);
        includesKeyword = true;
      }
    }
  }

  includesKeyword = false;

} // End of input file row iteration

console.log(categories[0].getCategoryKeyWords());