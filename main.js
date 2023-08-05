const resultNumbers = document.querySelector(".result-numbers");
const resultOperations = document.querySelector('.result-operations')
const allBtns = document.querySelectorAll(
  ".numbers-and-operators-container input"
);
const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const allOperations = ["%", "/", "*", 'x', "-", "+"];
let firstNum = "";
let operators = "";
let secondNum = "";
let mainResult = "";

if (resultNumbers.textContent.length > 7) {
  resultNumbers.style.fontSize = "2.4rem";
}

const mainResultHandler = () => {
  // if (firstNum && secondNum) {
    
  // }
};

const updateNumbers = (number) => {
  if (!operators) {
    firstNum += number;
    resultNumbers.textContent = firstNum
    console.log('first number');
  } else {
    secondNum += number;
    resultNumbers.textContent = secondNum
    console.log('second number');
  }
}

const emptyAll = () => {
  firstNum = "";
  operators = "";
  secondNum = "";
  mainResult = "";
  resultNumbers.textContent = ''
  resultOperations.textContent = ''
}

const negateCurrentValue = () => {
  console.log('do something');
}

// checks if it's a number or operator
const clickKeydownHandler = (event) => {
  if (event.type === "keydown" || event.type === "click") {
    if (
      allNumbers.includes(event.target.value) ||
      allNumbers.includes(event.key)
    ) {
      updateNumbers(event.target.value ?? event.key)
    } else if (event.target.value === 'AC') {
      emptyAll()
    } else if (event.target.value === '+/-') {
      negateCurrentValue()
    } else if (
      allOperations.includes(event.target.value) ||
      allOperations.includes(event.key)
    ) {
      operators += event.target.value ?? event.key;
    }
  }
  
};

document.addEventListener("keydown", clickKeydownHandler);
document.addEventListener("click", clickKeydownHandler);
