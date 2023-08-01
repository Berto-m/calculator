const resultNumbers = document.querySelector(".result-numbers");
const numbers = document.querySelectorAll(".numbers");

let firstNum = 0
let operator = undefined
let secondNum = 0
let mainResult = ''

console.log(operator);

console.log("changing font size so the result doesn't overflow");
if (resultNumbers.textContent.length > 7 ) {
  resultNumbers.style.fontSize = "2.4rem";
}


const clickKeydownHandler = (event) => {
  numbers.forEach((number) => {
    if (event.type === "keydown" && event.key === number.value) {
      console.log(number.value);
      mainResult += number.value
      resultNumbers.textContent = mainResult
      console.log(`I am the final result ${mainResult}`);
    } else if (event.type === "click" && event.target.value === number.value) {
      console.log(number);
    }
  });
};

document.addEventListener("keydown", clickKeydownHandler);
document.addEventListener("click", clickKeydownHandler);
