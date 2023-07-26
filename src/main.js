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
// Create final category for columns that don't match any keywords
categories.push(new BankCategory("Other"));

let inputData = "";

// Read the input file
try {
  inputData = fs.readFileSync(myInput, 'utf-8');
} catch (error) {
  console.error(`Error reading or parsing the JSON file: ${error}`);
  return;
}

let tempRowSplit, tempDate, tempValue, tempRowRemainder;
let includesKeyword = false;

// Iterate through input data
for (let row of inputData.split("\n")) {

  if (!row.includes(",")) {
    continue;
  }

  tempRowSplit = row.split(`","`);

  tempDate = tempRowSplit[0].substring(1);
  tempValue = parseFloat(tempRowSplit[1]);

  // Include subsequent array items later
  tempRowRemainder = tempRowSplit[2];

  for (let i = 0; i < categories.length-1 && includesKeyword === false; i++) {

    if(categories[i].compareToKeywords(tempRowRemainder)){
      includesKeyword = true;
    }

  } // End of iterating through categories

  if (includesKeyword === false){
    console.log(tempRowRemainder);
    console.log("Other");
  }

  // Reset before next iteration
  includesKeyword = false;



  //   // Check row information for keywords
  //   // CHANGE TO A FOR EACH LOOP
  //   // Do I need === false?
  //   for (let i = 0; i < categories.length || includesKeyword === false; i++) {

  //     includesKeyword = false;

  //     if (categories[i].compareToKeywords(tempRowRemainder)) {
  //       console.log(tempRowRemainder);
  //       categories[i].addToLog(tempDate, tempValue, tempRowRemainder);
  //       includesKeyword = true;
  //     }
  //   }
  // }

} // End of input file row iteration
