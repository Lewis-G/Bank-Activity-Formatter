const fs = require('fs');
const BankCategory = require('./bank-category');

let configObject, configJson;

// Read the config.json file
try {
  configJson = fs.readFileSync('config.json', 'utf-8');
  configObject = JSON.parse(configJson);
} catch (error) {
  console.error(`Error reading or parsing the JSON file: ${error}`);
  process.exit(1);
}

let keysArray = [];
let myInputPath = configObject.csvInput;
let myOutputPath = configObject.txtOutput;

keysArray = Object.keys(configObject.Categories);

if (keysArray === undefined || keysArray.length === 0) {
  console.error("No categories found. Exiting ...");
  process.exit(1);
}

let categories = [];
let tempCategoryName = '';

// Create array of BankCategory objects
for (let i = 0; i < keysArray.length; i++) {

  tempCategoryName = keysArray[i];

  categories.push(new BankCategory(tempCategoryName, configObject.Categories[tempCategoryName]))
}

// Create a category for data that does not match any keywords
categories.push(new BankCategory("Other"));

// Read the input file
let inputData = "";
try {
  inputData = fs.readFileSync(myInputPath, 'utf-8');
} catch (error) {
  console.error(`Error reading or parsing the JSON file:`, error);
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

  for (let i = 0; i < categories.length && matchedKeyword === false; i++) {

    if (categories[i].compareToKeywords(tempRowSplit[2])) {
      matchedKeyword = true;
      categories[i].addToListAndValue(tempRowSplit[0], tempRowSplit[1], tempRowSplit[2]);
    }
  }

  if (matchedKeyword === false){
    categories[categories.length-1].addToListAndValue(tempRowSplit[0], tempRowSplit[1], tempRowSplit[2]);
  }

  matchedKeyword = false;
} // End of row/line iteration

// Create/clear the file
try {
  fs.writeFileSync(myOutputPath, '');
} catch (err) {
  console.error('Error creating/clearing the file:', err);
  process.exit(1);
}

// Write to the file
try {

  if (configObject.OnlyPrintOther === "yes"){
    fs.appendFileSync(myOutputPath, `${categories[categories.length-1].categoryName}\n`);
    fs.appendFileSync(myOutputPath, `Total value: $${categories[categories.length-1].totalValue}\n`);
    fs.appendFileSync(myOutputPath, `Transaction Log: \n${categories[categories.length-1].transactionsList}\n`);
  }

  for (let i = 0; i < categories.length; i++) {

    fs.appendFileSync(myOutputPath, `${categories[i].categoryName}\n`);
    fs.appendFileSync(myOutputPath, `Total value: $${categories[i].totalValue}\n`);
    fs.appendFileSync(myOutputPath, `Transaction Log: \n${categories[i].transactionsList}\n`);
  }
} catch (error) {
  console.log('Error writing to file:', error);
}
