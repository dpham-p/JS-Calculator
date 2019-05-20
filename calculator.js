
const calcDisplay = document.querySelector('.calcDisplay');
const clearEntry = document.querySelector('.clearEntry');
const clearInputs = document.querySelector('.clearInputs');
const backspace = document.querySelector('.backspace');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.oper');
const plusMinus = document.querySelector('.plusMinus');
const decimal = document.querySelector('.decimal');
const equalButton = document.querySelector('.equal')
let operandValue = '';
let oldOperand = [];
let oldOperator = [];
let operand = [];
let oper = [];

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a,b,operator) {
    let result = 0;
    switch (operator) {
        case '+':
            result = add(a,b);
            operand[0] = result;
            break;
        case '-':
            result = subtract(a,b);
            operand[0] = result;
            break;
        case '×':
            result = multiply(a,b);
            operand[0] = result;
            break;
        case '÷':
            if(b != 0) {
                result = divide(a,b);
                operand[0] = result;
            }
            else {
                result = 'Cannot divide by zero!'
                numbers.forEach(num => num.disabled = true);
                operators.forEach(oper => oper.disabled = true); 
            }
            break;
        default:
            result = operand[0];
            console.log('default')
    }
    displayToCalc(Math.round(result*100)/100);
}



function buttonEventListeners() {
    numbers.forEach(num => {
        num.addEventListener('click', () => registerNum(num.textContent));
    })

    operators.forEach(operator => {
        operator.addEventListener('click', () => registerOperator(operator.textContent));
    })

    plusMinus.addEventListener('click', negate);

    decimal.addEventListener('click', addDecimal);

    clearEntry.addEventListener('click', clearDisplay);

    clearInputs.addEventListener('click', clearAll);

    backspace.addEventListener('click', deleteLastChar);
}

function registerNum(value) {
    operandValue += value;
    displayToCalc(operandValue);
}

function registerOperator(operator) {
    if(operand.length < 2 & operandValue != '') {
        operand.push(Number(operandValue));
        operandValue = '';
    }
    if(oper.length < operand.length) {
        if(!(oper[0] == null & operator == '=')) {
            oper.push(operator);
        }
    }
    if(oper.length >= 2) {
        oldOperator[0] = oper[0];
        oldOperand[1] = operand[1];
        if(oper[1] != '=') {
            operate(operand[0],operand[1],oper[0]);
            oper.shift();
            operand.pop();
        }
        console.log(oldOperator[0],oldOperand[1]);  
    }
    if(operator == '=') {
        operate(operand[0],oldOperand[1],oldOperator[0]);
        oper.pop();
        if(oper[0] != null & operand[1] != null) {
            oper.shift();
            operand.pop();
        }
    }
    console.log(operand[0],oper[0],operand[1],oper[1]);
}

function addDecimal(e) {
    console.log(operandValue)
    if(operandValue == '') {
        operandValue = '0.';
        displayToCalc(operandValue);
    }
    else if(!operandValue.includes('.')) {
        operandValue += e.target.textContent;
        displayToCalc(operandValue);
    }
}

function negate(e) {
    if(operandValue == '' & operand[0] != null) {
        operand[0] = -1 * operand[0];
        displayToCalc(operand[0]);
    }
    else if(operandValue != '') {
        operandValue = -1 * operandValue;
        displayToCalc(operandValue);
    }
    
}

function displayToCalc(value) {
    (value == null || value == '') ? calcDisplay.textContent = '0': calcDisplay.textContent = value;
}


function clearDisplay(e) {
    operandValue = '';
    displayToCalc('0');
    numbers.forEach(num => num.disabled = false);
    operators.forEach(oper => oper.disabled = false); 
}

function clearAll(e) {
    operandValue = '';
    displayToCalc('0');
    operand = [];
    oper = [];
    oldOperand = [];
    oldOperator = [];
    numbers.forEach(num => num.disabled = false);
    operators.forEach(oper => oper.disabled = false);
}

function deleteLastChar(e) {
    console.log(e.target.textContent)
    operandValue = operandValue.slice(0,-1);
    if (operandValue == '') {
        displayToCalc('0');
    }
    else {
        displayToCalc(operandValue);
    }
    numbers.forEach(num => num.disabled = false);
    operators.forEach(oper => oper.disabled = false);
}



buttonEventListeners();
window.addEventListener('keydown', e => {
    console.log(e.which);
    if((e.which >= 48 & e.which <= 57) || (e.which >= 96 & e.which <= 105)) {
        registerNum(e.key);
    }
    else {
        switch(e.which) {
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
            default:
        }
    }
    
});