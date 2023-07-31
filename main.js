const resultNumbers = document.querySelector(".result-numbers");
const numbers = document.querySelector('.numbers')

const displayResultNumbers = (event) => {
  console.log("nothing");
  if (
    resultNumbers.textContent.length > 7 &&
    resultNumbers.textContent.length < 12
  ) {
    resultNumbers.style.fontSize = "2.5rem";
  }
};


