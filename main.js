const delBtn = document.querySelector("#del-icon");
const resultNumbers = document.querySelector(".result-numbers");
const resultOperations = document.querySelector(".result-operations");
const decimalBtn = document.querySelector(".decimal");
const allBtns = document.querySelectorAll(
  ".numbers-and-operators-container input"
);
const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const allOperations = ["%", "/", "*", "x", "-", "+", "=", "AC", "+/-"];
const arrNumbers = [];
let firstNum = "";
let operators = "";
let secondNum = "";
let mainResult = 0;

if (resultNumbers.textContent.length > 7) {
  resultNumbers.style.fontSize = "2.1rem";
}

const mainResultHandler = (num1 = firstNum, num2 = secondNum) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (!mainResult) {
    resultOperations.textContent = `${num1} ${operators} ${num2}`;
  } else {
    resultOperations.textContent = `${mainResult} ${operators} ${num2}`;
  }
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
    resultNumbers.textContent = `${mainResult}`;
  } else if (mainResult && operators === "%") {
    mainResult = mainResult / num2;
    resultNumbers.textContent = `${mainResult}`;
  } else if (!mainResult && operators === "/") {
    if (num1 === 0) {
      acButtonHandler();
      resultNumbers.textContent = "🤦🏻‍♂️🤦🏽‍♀️";
    } else {
      mainResult = num1 / num2;
    }
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

  resultNumbers.textContent = `${mainResult}`;
};

// It needs check if there's already an operators in place
// to update first or second second number
const updateNumbersHandler = (number) => {
  if (!operators && firstNum.length < 12) {
    if (number === ".") {
      if (!firstNum) {
        firstNum += "0";
        resultNumbers.textContent = firstNum;
        decimalBtn.disabled = true;
      } else {
        decimalBtn.disabled = true;
      }
    }
    firstNum += number;
    resultNumbers.textContent = firstNum;
  } else if (operators && secondNum.length < 12) {
    if (number === ".") {
      if (!secondNum) {
        secondNum += "0";
        resultNumbers.textContent = secondNum;
        decimalBtn.disabled = true;
      } else {
        decimalBtn.disabled = true;
      }
    }
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

// Must only work when a number is entered.
const operatorsHandler = (currentOperator) => {
  if (currentOperator === "AC") {
    acButtonHandler();
  } else if (operators && secondNum) {
    mainResultHandler();
  } else if (firstNum) {
    if (currentOperator === "+/-") {
      firstNum = `${parseFloat(firstNum) * -1}`;
      resultNumbers.textContent = firstNum;
    } else if (currentOperator === "%") {
      operators = currentOperator;
      mainResultHandler(firstNum, (secondNum = 100));
    } else if (currentOperator != "=") {
      operators = currentOperator;
    }
  }
  decimalBtn.disabled = false;
};

const delBtnHandler = () => {
  if (secondNum) {
    secondNum = secondNum.slice(0, -1);
    resultNumbers.textContent = secondNum;
  } else if (firstNum) {
    firstNum = firstNum.slice(0, -1);
    resultNumbers.textContent = firstNum;
  }
};

// checks if it's a number or operator
const clickKeydownHandler = (event) => {
  console.log(event);
  if (event.type === "keydown" || event.type === "click") {
    if (event.key === "Backspace" || event.target === delBtn) {
      delBtnHandler();
    } else if (
      allNumbers.includes(event.target.value) ||
      allNumbers.includes(event.key)
    ) {
      updateNumbersHandler(event.target.value ?? event.key);
    } else if (
      allOperations.includes(event.target.value) ||
      allOperations.includes(event.key)
    ) {
      operatorsHandler(event.target.value ?? event.key);
      decimalBtn.disable = true;
    }
  }
  event.target.blur()
};

// It needs read whole page otherwise the buttons/inputs
// would need to be in an active state.
document.addEventListener("keydown", clickKeydownHandler);
document.addEventListener("click", clickKeydownHandler);
