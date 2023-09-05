const delBtn = document.querySelector("#del-icon");
const resultNumbers = document.querySelector(".result-numbers");
const resultOperations = document.querySelector(".result-operations");
const decimalBtn = document.querySelector(".decimal");
const allBtns = document.querySelectorAll(
  ".numbers-and-operators-container input"
);
const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const allOperations = ["%", "/", "*", "x", "-", "+"];
let firstNum = "";
let operator = "";
let secondNum = "";

const deleteAll = () => {
  firstNum = "";
  operator = "";
  secondNum = "";
  resultOperations.textContent = "";
  resultNumbers.textContent = "";
  decimalBtn.disabled = false;
};

const styleCurrentNumber = (num) => {
  if (num.length >= 0 && num.length <= 6) {
    resultNumbers.style.fontSize = "3.5rem";
  } else if (num.length === 8) {
    resultNumbers.style.fontSize = "3rem";
  } else if (num.length > 8) {
    resultNumbers.style.fontSize = "2.2rem";
  }
  return num;
};

const calculateResult = (num1, action, num2) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  firstNum = parseFloat(firstNum);

  if (action === "/") {
    firstNum = num1 / num2;
  } else if (action === "x" || action === "*") {
    firstNum = num1 * num2;
  } else if (action === "-") {
    firstNum = num1 - num2;
  } else if (action === "+") {
    firstNum = num1 + num2;
  }

  if (firstNum > 999999999 || firstNum < -999999999) {
    firstNum = firstNum.toExponential(2);
  } else if (firstNum % 2 !== 0) {
    firstNum = Math.round((firstNum + Number.EPSILON) * 1000) / 1000;
  }

  firstNum = firstNum.toString();
  secondNum = "";
};

const deleteCurrentNumber = () => {
  if (firstNum === resultNumbers.textContent) {
    firstNum = firstNum.slice(0, -1);
    resultNumbers.textContent = `${styleCurrentNumber(firstNum)}`;
    resultOperations.textContent = `${firstNum}`;
  } else if (secondNum === resultNumbers.textContent) {
    secondNum = secondNum.slice(0, -1);
    resultNumbers.textContent = `${styleCurrentNumber(secondNum)}`;
    resultOperations.textContent = `${firstNum} ${operator} ${secondNum}`;
  }
};

const newOperator = (action) => {
  decimalBtn.disabled = false;
  decimalCounter = 0;
  if (firstNum && secondNum) {
    if ((firstNum === "0" || secondNum === "0") && operator === "/") {
      deleteAll();
      resultNumbers.textContent = "😂💀";
    } else {
      calculateResult(firstNum, operator, secondNum);
      resultOperations.textContent = `${firstNum} ${action}`;
      resultNumbers.textContent = `${styleCurrentNumber(firstNum)}`;
      operator = action;
    }
  } else if (firstNum) {
    if (action === "%" && firstNum !== "0") {
      decimalBtn.disabled = true;
      firstNum = `${firstNum / 100}`;
      resultNumbers.textContent = `${styleCurrentNumber(firstNum)}`;
    } else {
      resultOperations.textContent = `${firstNum} ${action}`;
      operator = action;
    }
  }
};

const equalEnter = () => {
  if (firstNum && secondNum) {
    if ((firstNum === "0" || secondNum === "0") && operator === "/") {
      deleteAll();
      resultNumbers.textContent = "😂💀";
    } else {
      let tempSecondNum = secondNum;
      let tempFirstNum = firstNum;
      calculateResult(firstNum, operator, secondNum);
      resultOperations.textContent = `${tempFirstNum} ${operator} ${tempSecondNum}`;
      resultNumbers.textContent = `${styleCurrentNumber(firstNum)}`;
      operator = "";
    }
  }
};

const updateNumber = (num) => {
  if (!operator) {
    if (firstNum.length < 11) {
      firstNum += num;
      resultNumbers.textContent = `${styleCurrentNumber(firstNum)}`;
      resultOperations.textContent = `${firstNum}`;
    }
  } else {
    if (secondNum.length < 11) {
      secondNum += num;
      resultNumbers.textContent = `${styleCurrentNumber(secondNum)}`;
      resultOperations.textContent = `${firstNum} ${operator} ${secondNum}`;
    }
  }
  console.log(firstNum);
};

const addDecimal = () => {
  decimalBtn.disabled = true;
  if (!operator) {
    if (!firstNum) {
      updateNumber("0.");
    } else {
      updateNumber(".");
    }
  } else {
    if (!secondNum) {
      updateNumber("0.");
    } else {
      updateNumber(".");
    }
  }
};

const oppositeNum = () => {
  if (!operator && firstNum) {
    firstNum = `${parseFloat(firstNum) * -1}`;
    resultNumbers.textContent = `${styleCurrentNumber(firstNum)}`;
    resultOperations.textContent = `${firstNum}`;
    console.log(firstNum);
  } else if (secondNum && secondNum) {
    secondNum = `${parseFloat(secondNum) * -1}`;
    resultNumbers.textContent = `${styleCurrentNumber(secondNum)}`;
    resultOperations.textContent = `${firstNum} ${operator} ${secondNum}`;
  }
};

// checks if it's a number or operator
const clickKeydownHandler = (event) => {
  if (event.type === "keydown" || event.type === "click") {
    if (event.target.value === "." || event.key === ".") {
      addDecimal();
    } else if (event.target.value === "=" || event.key === "Enter") {
      equalEnter();
    } else if (event.target.value === "AC") {
      deleteAll();
    } else if (event.target.value === "+/-") {
      oppositeNum();
    } else if (event.target === delBtn) {
      deleteCurrentNumber();
    } else if (
      allNumbers.includes(event.target.value) ||
      allNumbers.includes(event.key)
    ) {
      updateNumber(event.target.value ?? event.key);
    } else if (
      allOperations.includes(event.target.value) ||
      allOperations.includes(event.key)
    ) {
      newOperator(event.target.value ?? event.key);
    }
  }
  event.target.blur();
};

// It needs read whole page otherwise the buttons/inputs
// would need to be in an active state.
document.addEventListener("keydown", clickKeydownHandler);
document.addEventListener("click", clickKeydownHandler);
