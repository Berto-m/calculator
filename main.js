const delBtn = document.querySelector("#del-icon");
const resultNumbers = document.querySelector(".result-numbers");
const resultOperations = document.querySelector(".result-operations");
const decimalBtn = document.querySelector(".decimal");
const allBtns = document.querySelectorAll(
  ".numbers-and-operators-container input"
);
const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const allOperations = ["%", "/", "*", "x", "-", "+", "=", "AC", "+/-", "Enter"];
let firstNum = "";
let operators = "";
let secondNum = "";
let mainResult = 0;

const checkNumLength = (num) => {
  num = num.toString();
  if (num.length >= 0 && num.length <= 6) {
    resultNumbers.style.fontSize = "3.5rem";
  } else if (num.length === 8) {
    resultNumbers.style.fontSize = "3rem";
  } else if (num.length > 8) {
    resultNumbers.style.fontSize = "2.4rem";
  }
  return num;
};

// SecondNum is emptied here otherwise it add the new numbers
// to the old ones.
const mainResultHandler = (num1 = firstNum, num2 = secondNum) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (operators !== "%") {
    if (!mainResult) {
      resultOperations.textContent = `${num1} ${operators} ${num2}`;
    } else {
      resultOperations.textContent = `${mainResult} ${operators} ${num2}`;
    }
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
  } else if (mainResult && operators === "%") {
    mainResult = mainResult / num2;
  } else if (!mainResult && operators === "/") {
    mainResult = num1 / num2;
  } else if (mainResult && operators === "/") {
    mainResult = mainResult / num2;
  }

  if (mainResult > 999999999 || mainResult < -999999999) {
    mainResult = mainResult.toExponential();
    resultNumbers.textContent = `${checkNumLength(mainResult)}`;
  } else if (Number.isInteger(mainResult)) {
    resultNumbers.textContent = `${checkNumLength(mainResult)}`;
  } else {
    mainResult = Math.round((mainResult + Number.EPSILON) * 100) / 100;
    resultNumbers.textContent = `${checkNumLength(mainResult)}`;
  }
  secondNum = "";
  
};

// It needs check if there's already an operators in place
// to update first or second second number.
// decimal must disabled after it's been clicked
const updateNumbersHandler = (number) => {
 if (!operators && firstNum.length < 10) {
    if (number === ".") {
      if (!firstNum) {
        firstNum += "0";
        resultNumbers.textContent = `${checkNumLength(firstNum)}`;
        decimalBtn.disabled = true;
      }
    }
    firstNum += number;
    resultNumbers.textContent = `${checkNumLength(firstNum)}`;
  } else if (operators && secondNum.length < 10) {
    if (number === ".") {
      if (!secondNum) {
        secondNum += "0";
        resultNumbers.textContent = `${checkNumLength(secondNum)}`;
        decimalBtn.disabled = true;
      }
    }
    secondNum += number;
    resultNumbers.textContent = `${checkNumLength(secondNum)}`;
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
// Decimal must be disabled here since because new numbers are
// entered after.
// Diving by zero is handled here otherwise, it will interfere with
// the last if statement black in the mainResultHandler function.
const operatorsHandler = (currentOperator) => {
  if (currentOperator === "AC") {
    acButtonHandler();
  } else if (operators === "/" && (firstNum === "0" || secondNum === "0")) {
    acButtonHandler();
    resultNumbers.textContent = "🤦🏻‍♂️🤦🏽‍♀️";
  } else if (operators && secondNum) {
    mainResultHandler();
  } else if (firstNum) {
    if (currentOperator === "+/-") {
      firstNum = `${parseFloat(firstNum) * -1}`;
      resultNumbers.textContent = checkNumLength(firstNum);
    } else if (currentOperator === "%") {
      operators = currentOperator;
      mainResultHandler(firstNum, (secondNum = 100));
    } else if (currentOperator != "=") {
      operators = currentOperator;
    }
  }
};

const delBtnHandler = () => {
  if (mainResult) {
    acButtonHandler();
  } else if (secondNum) {
    secondNum = secondNum.slice(0, -1);
    resultNumbers.textContent = `${checkNumLength(secondNum)}`;
  } else if (firstNum) {
    firstNum = firstNum.slice(0, -1);
    resultNumbers.textContent = `${checkNumLength(firstNum)}`;
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
      console.log(event.target);
      updateNumbersHandler(event.target.value ?? event.key);
    } else if (
      allOperations.includes(event.target.value) ||
      allOperations.includes(event.key)
    ) {
      operatorsHandler(event.target.value ?? event.key);
      decimalBtn.disable = true;
    }
  }
  event.target.blur();
};

// It needs read whole page otherwise the buttons/inputs
// would need to be in an active state.
document.addEventListener("keydown", clickKeydownHandler);
document.addEventListener("click", clickKeydownHandler);
