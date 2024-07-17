const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let dis1Numb = "";
let dis2Numb = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      console.log(e.target.innerText);
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Numb += e.target.innerText;
    displayInput.innerText = dis2Numb;
  });
});

operation.forEach((operasi) => {
  operasi.addEventListener("click", (e) => {
    if (!dis2Numb) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Numb && dis2Numb && lastOperation) {
      console.log("Jalakan Operation");
      operationMath();
    } else {
      result = parseFloat(dis2Numb);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  dis1Numb += dis2Numb + " " + name + " ";
  displayHistory.innerText = dis1Numb;
  displayInput.innerText = "";
  dis2Numb = "";
  tempResult.innerText = result;
}

function operationMath() {
  switch (lastOperation) {
    case "+":
      result = parseFloat(result) + parseFloat(dis2Numb);
      break;
    case "-":
      result = parseFloat(result) - parseFloat(dis2Numb);
      break;
    case "/":
      result = parseFloat(result) / parseFloat(dis2Numb);
      break;
    case "X":
      result = parseFloat(result) * parseFloat(dis2Numb);
      break;
    case "%":
      result = parseFloat(result) % parseFloat(dis2Numb);
      break;
  }
}

equal.addEventListener("click", () => {
  if (!dis1Numb || !dis2Numb) return;
  haveDot = false;
  operationMath();
  clearVar();
  displayInput.innerText = result;
  tempResult.innerText = "";
  dis2Numb = result;
  dis1Numb = "";
});

clearAll.addEventListener("click", () => {
  dis1Numb = "";
  dis2Numb = "";
  haveDot = false;
  displayHistory.innerText = "";
  displayInput.innerText = "";
  tempResult.innerText = "";
  result = "";
  lastOperation = "";
});

clearLast.addEventListener("click", () => {
  displayInput.innerText = "";
  dis2Numb = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("X");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "Backspace") {
    clickClear();
  }
});

function clickButton(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operation.forEach((operasi) => {
    if (operasi.innerText === key) {
      operasi.click();
    }
  });
}

function clickEqual() {
  equal.click();
}

function clickClear() {
  clearAll.click();
}
