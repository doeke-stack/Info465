// integer_stats.js
// This program reads integers from the user, stores them in an array,
// calculates the mean and median, and displays the results in the console.
// The user can type q to stop entering numbers.

const readline = require("readline");

// Create an interface for reading input from the command line.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// This array stores all valid integers entered by the user.
const numbers = [];

// Function to calculate the mean/average of an array of numbers.
function calculateMean(arr) {
  const sum = arr.reduce((total, num) => total + num, 0);
  return sum / arr.length;
}

// Function to calculate the median of an array of numbers.
function calculateMedian(arr) {
  // Make a copy before sorting so the original array is not changed.
  const sorted = [...arr].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  // If the array length is odd, the median is the middle number.
  if (sorted.length % 2 !== 0) {
    return sorted[middle];
  }

  // If the array length is even, the median is the average of the two middle numbers.
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

// Function that repeatedly asks the user for integers.
function askForNumber() {
  rl.question("Enter an integer, or type q to quit: ", (input) => {
    const trimmedInput = input.trim();

    // Allow the user to quit by entering q or Q.
    if (trimmedInput.toLowerCase() === "q") {
      if (numbers.length === 0) {
        console.log("No integers were entered. Mean and median cannot be calculated.");
      } else {
        const mean = calculateMean(numbers);
        const median = calculateMedian(numbers);

        console.log("\nNumbers entered:", numbers);
        console.log("Mean:", mean);
        console.log("Median:", median);
      }

      rl.close();
      return;
    }

    // Error handling: reject blank input, decimals, and non-integer strings.
    // This regular expression allows positive and negative integers only.
    if (!/^-?\d+$/.test(trimmedInput)) {
      console.log("Invalid input. Please enter a whole integer, such as 5, -2, or 10.");
      askForNumber();
      return;
    }

    // Convert the validated string input into an integer and store it.
    const number = Number(trimmedInput);
    numbers.push(number);

    console.log(`${number} added to the list.`);
    askForNumber();
  });
}

console.log("Integer Mean and Median Calculator");
console.log("Type q when you are done entering integers.\n");
askForNumber();
