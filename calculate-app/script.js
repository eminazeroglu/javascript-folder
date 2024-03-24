const display = document.querySelector('#display');
const calculateElement = document.querySelector('#calculate');

let displayNumber = 0;
let operator = '';
let firstValue = '';
let selectOperator = false;

const displayView = () => {
    display.value = displayNumber;
}

const updateDisplay = (value) => {
    if (selectOperator) {
        displayNumber = value;
        selectOperator = false;
    }
    else {
        displayNumber = displayNumber.toString() === '0' ? value : displayNumber + value;
    }
}

const clearDisplay = () => {
    displayNumber = 0;
    operator = '';
    firstValue = '';
    selectOperator = false;
}

const dotDisplay = (value) => {
    if (!displayNumber.toString().includes(value)) {
        displayNumber += value;
    }
}

const operatorView = (newOperator) => {

    const value = parseFloat(displayNumber);

    if (!firstValue) {
        firstValue = value;
    }
    else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayNumber = String(result);
        firstValue = result;
    }

    selectOperator = true;
    operator = newOperator;
}

const calculate = (first, second, operator) => {

    if (operator === '+') {
        return parseFloat(first) + parseFloat(second);
    }
    else if (operator === '-') {
        return parseFloat(first) - parseFloat(second);
    }
    else if (operator === '/') {
        return parseFloat(first) / parseFloat(second);
    }
    else if (operator === '*') {
        return parseFloat(first) * parseFloat(second);
    }

    return second;
}

displayView();

calculateElement.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const value = e.target.value;
        if (e.target.classList.contains('operator')) {
            operatorView(value)
            displayView();
        }
        else if (e.target.classList.contains('dot')) {
            dotDisplay(value);
            displayView();
        }
        else if (e.target.classList.contains('clear')) {
            clearDisplay();
            displayView();
        }
        else {
            updateDisplay(value);
            displayView();
        }
    }
})