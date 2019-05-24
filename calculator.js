const calcText = document.querySelector('#calcText');
const clearEntry = document.querySelector('.clearEntry');
const clearInputs = document.querySelector('.clearInputs');
const backspace = document.querySelector('.backspace');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.oper');
const plusMinus = document.querySelector('.plusMinus');
const decimal = document.querySelector('.decimal');
const equalButton = document.querySelector('.equal');
let operandValue = '';
let oldOperand = [];
let oldOperator = [];
let operand = [];
let oper = [];

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  let result = 0;
  switch (operator) {
    case '+':
      result = add(a, b);
      operand[0] = result;
      break;
    case '-':
      result = subtract(a, b);
      operand[0] = result;
      break;
    case '×':
      result = multiply(a, b);
      operand[0] = result;
      break;
    case '÷':
      if (b != 0) {
        result = divide(a, b);
        operand[0] = result;
      } else {
        result = 'Cannot divide by zero!';
        numbers.forEach(num => (num.disabled = true));
        operators.forEach(oper => (oper.disabled = true));
      }
      break;
    default:
      result = operand[0];
      console.log('default');
  }
  displayToCalc(Math.round(result * 100) / 100);
}

function displayToCalc(value) {
  console.log(value);
  value == null || value == ''
    ? (calcText.textContent = '0')
    : (calcText.textContent = value);
}

function buttonEventListeners() {
  numbers.forEach(num => {
    num.addEventListener('click', () => registerNum(num.textContent));
  });
  numbers.forEach(num => num.addEventListener('transitionend', removeActive));

  operators.forEach(operator => {
    operator.addEventListener('click', () =>
      registerOperator(operator.textContent)
    );
  });

  plusMinus.addEventListener('click', negate);
  plusMinus.addEventListener('transitionend', removeActive);
  decimal.addEventListener('click', addDecimal);
  decimal.addEventListener('transitionend', removeActive);
  clearEntry.addEventListener('click', clearDisplay);
  clearEntry.addEventListener('transitionend', removeActive);
  clearInputs.addEventListener('click', clearAll);
  clearInputs.addEventListener('transitionend', removeActive);
  backspace.addEventListener('click', deleteLastChar);
  backspace.addEventListener('transitionend', removeActive);
}

function registerKeyPress(e) {
  console.log(e.which);
  if ((e.which >= 48) & (e.which <= 57) || (e.which >= 96) & (e.which <= 105)) {
    registerNum(e.key);
  } else {
    switch (e.which) {
      case 106:
        registerOperator('×');
        break;
      case 107:
        registerOperator('+');
        break;
      case 109:
        registerOperator('-');
        break;
      case 111:
        registerOperator('÷');
        break;
      case 13:
        registerOperator('=');
        break;
      case 8:
        deleteLastChar();
        break;
      default:
    }
  }
}
function registerNum(value) {
  let key = document.getElementById(`${value}`);
  key.classList.add('active');
  operandValue += value;
  displayToCalc(operandValue);
}

function registerOperator(operator) {
  if ((operand.length < 2) & (operandValue != '')) {
    operand.push(Number(operandValue));
    operandValue = '';
  }
  if (oper.length < operand.length) {
    if (!((oper[0] == null) & (operator == '='))) oper.push(operator);
  }

  if ((oper[0] != operator) & (operator != '=')) oper[0] = operator;

  if (oper.length >= 2) {
    oldOperator[0] = oper[0];
    oldOperand[1] = operand[1];
    if (oper[1] != '=') {
      operate(operand[0], operand[1], oper[0]);
      oper.shift();
      operand.pop();
    }
    console.log(oldOperator[0], oldOperand[1]);
  }
  if (operator == '=') {
    operate(operand[0], oldOperand[1], oldOperator[0]);
    oper.pop();
    if ((oper[0] != null) & (operand[1] != null)) {
      oper.shift();
      operand.pop();
    }
  }
  console.log(operand[0], oper[0], operand[1], oper[1]);
}

// Event function to add decimal to operand value
function addDecimal(e) {
  decimal.classList.add('active');
  if (operandValue == '') {
    operandValue = '0.';
    displayToCalc(operandValue);
    console.log(operandValue);
  } else if (!operandValue.includes('.')) {
    operandValue += e.target.textContent;
    displayToCalc(operandValue);
  }
}

// Event function to negate operand
function negate(e) {
  plusMinus.classList.add('active');
  if ((operandValue == '') & (operand[0] != null)) {
    operand[0] = -1 * operand[0];
    displayToCalc(operand[0]);
  } else if (operandValue != '') {
    operandValue = -1 * operandValue;
    displayToCalc(operandValue);
  }
}

// Event function to clear display
function clearDisplay(e) {
  clearEntry.classList.add('active');
  operandValue = '';
  displayToCalc('0');
  numbers.forEach(num => (num.disabled = false));
  operators.forEach(oper => (oper.disabled = false));
}

function clearAll(e) {
  clearInputs.classList.add('active');
  operandValue = '';
  displayToCalc('0');
  operand = [];
  oper = [];
  oldOperand = [];
  oldOperator = [];
  numbers.forEach(num => (num.disabled = false));
  operators.forEach(oper => (oper.disabled = false));
}

function deleteLastChar(e) {
  backspace.classList.add('active');
  operandValue = operandValue.slice(0, -1);
  if (operandValue == '') {
    displayToCalc('0');
  } else {
    displayToCalc(operandValue);
  }
  numbers.forEach(num => (num.disabled = false));
  operators.forEach(oper => (oper.disabled = false));
}

function removeActive(e) {
  if (e.propertyName != 'transform') return;
  e.target.classList.remove('active');
}

buttonEventListeners();
window.addEventListener('keydown', registerKeyPress);
