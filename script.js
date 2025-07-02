
let display = document.getElementById("display");
let currentInput = "";

function appendnumber(number){
    currentInput += number;
    updateDisplay();
}    

function appendOperator(operator) {
  if (currentInput === "") return;
  const lastChar = currentInput[currentInput.length - 1];
  if ("+-*/%".includes(lastChar)) return;
  currentInput += operator;
  updateDisplay();
}

function cleardisplay() {
  currentInput = "";
  updateDisplay();
}
function deletetext() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}
function calculate() {
  try {
    let result = eval(currentInput);
    currentInput = result.toString();
    updateDisplay();
  } catch {
    display.textContent = "Error";
  }
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key) || key === "00") {
    // If number
    appendnumber(key);
  } else if (["+", "-", "*", "/", "%", "."].includes(key)) {
    appendOperator(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault(); // prevent form submit on Enter
    calculate();
  } else if (key === "Backspace") {
    deletetext();
  } else if (key.toLowerCase() === "c") {
    cleardisplay();
  }
});
