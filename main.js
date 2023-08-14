const resultNumbers = document.querySelector(".result-numbers");
const resultOperations = document.querySelector(".result-operations");
const allBtns = document.querySelectorAll(
  ".numbers-and-operators-container input"
);
const dividedByZero = "🤦🏻‍♂️🤦🏽‍♀️";
const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const allOperations = ["%", "/", "*", "x", "-", "+", "="];
let firstNum = "";
let operators = "";
let secondNum = "";
let mainResult = 0;

if (resultNumbers.textContent.length > 7) {
  resultNumbers.style.fontSize = "2.4rem";
}

const mainResultHandler = (num1 = firstNum, num2 = secondNum) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (!mainResult && (operators === "x" || operators === "*")) {
    mainResult = num1 * num2;
  } else if (mainResult && (operators === "x" || operators === "*")) {
    mainResult = mainResult * num2;
  } else if (!mainResult && operators === "+") {
    mainResult = num1 + num2;
  } else if (mainResult && operators === "+") {
    mainResult = mainResult + num2;
  } else if (!mainResult && operators === "-") {
    mainResult = num1 - num2;
  } else if (mainResult && operators === "-") {
    mainResult = mainResult - num2;
  } else if (!mainResult && operators === "%") {
    mainResult = num1 / num2;
    console.log(mainResult);
  } else if (mainResult && operators === "%") {
    mainResult = mainResult / num2;
    console.log(mainResult);
  } else if (!mainResult && operators === "/") {
    mainResult = num1 / num2;
  } else if (mainResult && operators === "/") {
    if (num2 === 0) {
      acButtonHandler();
      resultNumbers.textContent = "🤦🏻‍♂️🤦🏽‍♀️";
    } else {
      mainResult = mainResult / num2;
    }
  }

  if (Number.isInteger(mainResult)) {
    console.log("im int");
    console.log(mainResult);
  } else {
    console.log(`im float`);
    console.log(mainResult);
  }
  console.log(`main result handler ${mainResult}`);
  secondNum = "";
};

// It needs check if there's already an operators in place
// to update first or second second number.
const updateNumbersHandler = (number) => {
  if (!operators) {
    firstNum += number;
    resultNumbers.textContent = firstNum;
  } else {
    secondNum += number;
    resultNumbers.textContent = secondNum;
  }
};

const acButtonHandler = () => {
  firstNum = "";
  operators = "";
  secondNum = "";
  mainResult = 0;
  resultNumbers.textContent = "";
  resultOperations.textContent = "";
};

const negateCurrentValue = () => {
  console.log("do something here");
};

// Must only work when a number is entered.
const operatorsHandler = (currentOperator) => {
  if (operators && secondNum) {
    mainResultHandler();
  } else if (firstNum) {
    if (currentOperator === "%") {
      operators = currentOperator;
      mainResultHandler(firstNum, (secondNum = 100));
    } else if (currentOperator != "=") {
      operators = currentOperator;
    }
  }
};

// checks if it's a number or operator
const clickKeydownHandler = (event) => {
  if (event.type === "keydown" || event.type === "click") {
    if (
      allNumbers.includes(event.target.value) ||
      allNumbers.includes(event.key)
    ) {
      updateNumbersHandler(event.target.value ?? event.key);
    } else if (event.target.value === "AC") {
      acButtonHandler();
    } else if (event.target.value === "+/-") {
      negateCurrentValue();
    } else if (
      allOperations.includes(event.target.value) ||
      allOperations.includes(event.key)
    ) {
      operatorsHandler(event.target.value ?? event.key);
    }
  }
};

// It needs read whole page otherwise the buttons/inputs
// would need to be in an active state.
document.addEventListener("keydown", clickKeydownHandler);
document.addEventListener("click", clickKeydownHandler);
