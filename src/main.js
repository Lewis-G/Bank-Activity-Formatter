const fs = require('fs');

let myInput, myOutput;

// Read the JSON file
fs.readFile('config.json', 'utf8', (error, data) => {
  if (error) {
    console.log('Error:', error);
    return;
  }

  try {
    
    // Get the input and output file paths


    const jsonData = JSON.parse(data);
    const keysArray = Object.keys(jsonData.Categories);
    console.log(keysArray);

  } catch (error) {
    console.log('Error parsing JSON:', error);
  }
});
