const fs = require("fs");
const csv = require("csvtojson");

// Function to calculate the sum of sales from a CSV file
async function sumOfSales(csvFile) {
  try {
    // Read the CSV file and convert it to JSON
    const sales = await csv().fromFile(csvFile);

    // Keep track of the department and its total sales using a hashmap
    const helper = {};

    // Iterate through the CSV data
    for (let i = 0; i < sales.length; i++) {
      const currentSale = sales[i];
      const currentDep = currentSale["DepartmentName"];
      const currentVal = currentSale["Numberofsales"];

      // Check if the hashmap contains the current department
      // If yes, add the current sales to the cumulative total
      // If not, initialize the current department with the current sales
      if (helper.hasOwnProperty(currentDep)) {
        helper[currentDep] += Number(currentVal);
      } else {
        helper[currentDep] = Number(currentVal);
      }
    }

    const data = helper;
    const keys = Object.keys(data);
    const csvData = keys.map(key => [key, data[key]]);
    const csvContent = csvData.map(row => row.join(",")).join("\n");

    // Specify the file path to write the CSV content to
    const filePath = "output.csv";

    // Write the CSV content to the file path
    fs.writeFile(filePath, csvContent, "utf8", err => {
      if (err) {
        console.error("Error writing CSV file:", err);
        return;
      }
      console.log("CSV file has been successfully created and written.");
    });
  } catch (error) {
    console.error("Error reading CSV file:", error);
  }
}

// Call the sumOfSales function with the input CSV file path
sumOfSales("sales.csv");