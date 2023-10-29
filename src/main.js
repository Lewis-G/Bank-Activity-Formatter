const fs = require('fs');
const BankCategory = require('./bank-category');

let configObject, configJson;

// Read the config.json file
try {
  configJson = fs.readFileSync('config.json', 'utf-8');
  configObject = JSON.parse(configJson);
} catch (error) {
  console.error(`Error reading or parsing the JSON file: ${error}`);
  return;
}

let keysArray = [];
let myInputPath = configObject.csvInput;
let myOutputPath = configObject.txtOutput;

keysArray = Object.keys(configObject.Categories);

if (keysArray.length === 0) {
  console.List("No categories found. Exiting ...");
  return;
}

let categories = [];
let tempCategoryName = '';

for (let i = 0; i < keysArray.length; i++) {

  tempCategoryName = keysArray[i];

  categories.push(new BankCategory(tempCategoryName, configObject.Categories[tempCategoryName]))
}

// Create a category for data that does not match any keywords
categories.push(new BankCategory("Other"));

let inputData = "";

// Read the input file
try {
  inputData = fs.readFileSync(myInputPath, 'utf-8');
} catch (error) {
  console.error(`Error reading or parsing the JSON file: ${error}`);
  return;
}

let tempRowSplit = [];
let matchedKeyword = false;

// Iterate through each row/line of the input data
for (let row of inputData.split("\n")) {

  // Skip empty rows
  if (!row.includes(",")) {
    continue;
  }

  // Split row by commas; date, value, description
  tempRowSplit = row.split(`","`);

  // Trim 1st and 3rd items of commas
  tempRowSplit[0] = tempRowSplit[0].substring(1);
  tempRowSplit[1] = parseFloat(tempRowSplit[1]);
  tempRowSplit[2] = tempRowSplit[2].substring(0, tempRowSplit[2].length - 2);

  for (let m = 0; m < categories.length && matchedKeyword === false; m++) {

    if (categories[m].compareToKeywords(tempRowSplit[2])) {
      matchedKeyword = true;
      categories[m].addToListAndValue(tempRowSplit[0], tempRowSplit[1], tempRowSplit[2]);
    }
  }
  matchedKeyword = false;
} // End of row/line iteration

writeToFile();

async function writeToFile() {

  for (let t = 0; t < categories.length; t++) {

    await fs.appendFile(myOutputPath, `Categories name : ${categories[t].categoryName}\n`);

    // console.log();
    // console.log(`Value is : ${categories[t].totalValue}`);
    // console.log(`List is: `);
    // console.log(categories[t].transactionsList);
    // console.log();

  }
}
