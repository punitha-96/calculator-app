let currentInput = "";
let previousInput = "";
let operation = null;
let shouldResetScreen = false;

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operation = null;
  shouldResetScreen = false;
  updateDisplay();
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentInput = number;
    shouldResetScreen = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function chooseOperation(op) {
  if (shouldResetScreen) {
    shouldResetScreen = false;
    currentInput = previousInput + op;
  } else if (currentInput !== "") {
    currentInput += op;
  } else if (previousInput !== "") {
    currentInput = previousInput + op;
  }
  operation = op;
  updateDisplay();
}

function calculate() {
  let result;
  const expression = currentInput;
  try {
    result = eval(expression);
    if (!isFinite(result)) {
      throw new Error("Math Error");
    }
  } catch (error) {
    result = "Error";
  }

  currentInput = result.toString();
  previousInput = currentInput;
  shouldResetScreen = true;
  updateDisplay();
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperation(key);
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    clearDisplay();
  }
});

updateDisplay();
