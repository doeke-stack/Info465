// product_condition_checker.js
// Programming Assignment 2
// This program asks the user to enter integers until they type q or Q to quit.
// It echoes the entered integers back to the user.
// Then it checks whether the product of any two entered integers equals a third entered integer.

const readline = require("readline");

// Create a command-line input/output interface.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array used to store valid integers entered by the user.
const numbers = [];

// This function checks whether any two numbers multiply to equal a third number.
// It uses indexes instead of only values so duplicate numbers are handled correctly.
function findProductCondition(arr) {
  // A product condition needs at least three separate entered integers.
  if (arr.length < 3) {
    return null;
  }

  // Check every pair of numbers in the array.
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const product = arr[i] * arr[j];

      // Look for a third number at a different index that equals the product.
      for (let k = 0; k < arr.length; k++) {
        if (k !== i && k !== j && arr[k] === product) {
          return {
            first: arr[i],
            second: arr[j],
            product: arr[k]
          };
        }
      }
    }
  }

  // Return null if no matching condition is found.
  return null;
}

// This function repeatedly prompts the user for input.
function askForInteger() {
  rl.question("Enter an integer, or type q to quit: ", (input) => {
    const trimmedInput = input.trim();

    // Accept lowercase q or capital Q as a request to quit.
    if (trimmedInput.toLowerCase() === "q") {
      console.log("\nIntegers entered:", numbers);

      const result = findProductCondition(numbers);

      if (result) {
        console.log(`Condition is met: ${result.first} x ${result.second} = ${result.product}`);
      } else {
        console.log("Condition was not met");
      }

      rl.close();
      return;
    }

    // Error handling: only whole integers are valid.
    // This allows positive integers, negative integers, and zero.
    if (!/^-?\d+$/.test(trimmedInput)) {
      console.log("Error: Please enter an integer or q to quit.");
      askForInteger();
      return;
    }

    // Convert valid input into a number and store it in the array.
    const number = Number(trimmedInput);
    numbers.push(number);

    // Echo the entered integer back to the user.
    console.log(`You entered: ${number}`);

    askForInteger();
  });
}

console.log("Product Condition Checker");
console.log("Type q or Q when you are finished entering integers.\n");
askForInteger();
