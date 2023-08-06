const resultNumbers = document.querySelector(".result-numbers");
const resultOperations = document.querySelector(".result-operations");
const allBtns = document.querySelectorAll(
  ".numbers-and-operators-container input"
);
const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const allOperations = ["%", "/", "*", "x", "-", "+"];
let firstNum = "";
let operators = "";
let secondNum = "";
let mainResult = 0;

if (resultNumbers.textContent.length > 7) {
  resultNumbers.style.fontSize = "2.4rem";
}

const mainResultHandler = () => {
  if ((operators === "x" || operators === "*") && !mainResult) {
    mainResult = parseInt(firstNum) * parseInt(secondNum);
  } else if (mainResult && (operators === "x" || operators === "*")) {
    mainResult = mainResult * parseInt(secondNum);
  }
  console.log(mainResult);
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
    mainResultHandler();
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
// SecondNum must be emptied here so when a new operator is clicked
// or pressed the mainResultHandler() doesn't use the old values from 
// from SecondNum.can 
const operatorsHandler = (currentOperator) => {
  if (operators) {
    operators = currentOperator;
    secondNum = "";
    console.log(operators);
  } else if (firstNum) {
    operators = currentOperator;
    console.log(operators);
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
    } else if (event.target.value == "=") {
      console.log("hello");
    }
  }
};


// It needs read whole page otherwise the buttons/inputs
// would need to be in an active state.
document.addEventListener("keydown", clickKeydownHandler);
document.addEventListener("click", clickKeydownHandler);
