const fs = require('fs');
const BankCategory = require('./bank-category');

let configData, configJson;

// Read the config.json file
try {
  configJson = fs.readFileSync('config.json', 'utf-8');
  configData = JSON.parse(configJson);
} catch (error){
  console.error(`Error reading or parsing the JSON file: ${error}`);
}

let myInput, myOutput;
let keysArray = [];
myInput = configData.csvInput;
myOutput = configData.txtOutput;

keysArray = Object.keys(configData.Categories);

if (keysArray.length === 0){
  console.log("No categories found. Exiting ...");
  return;
}

// Create array of BankCateogry objects
let categories = [];
for (i = 0; i < keysArray.length; i++){

  categories.push(new BankCategory(keysArray[i], configData.Categories[keysArray[i]]));
  // console.log(configData.Categories[keysArray[i]]);
}

fs.readFile(myInput, "utf8", (error, myContent) => {

  if(error){throw error;}

  for (let row of myContent.split("\n")){

    console.log(row);

  }
});