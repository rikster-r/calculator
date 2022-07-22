class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    sign() {
        if (this.currentOperand.includes('-')) {
            this.currentOperand = this.currentOperand.toString().slice(1);
        } else {
            this.currentOperand = '-' + this.currentOperand
        }
    }

    appendNumber(number) {
        if ((number === '0' || number === '00') && !this.currentOperand) return;
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number;
    }

    selectOperation(operation) {
        if (!this.currentOperand) return;
        if(this.previousOperand) {
            this.operate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand + operation;
        this.currentOperand = '';
    }

    updateDisplay() {
        this.previousOperandTextElement.textContent = this.previousOperand;
        this.currentOperandTextElement.textContent = this.currentOperand;
    }

    add(number1, number2) {
        return number1 + number2;
    }

    subtract(number1, number2) {
        return number1 - number2;
    }

    multiply(number1, number2) {
        return number1 * number2;
    }

    divide(number1, number2) {
        return number1 / number2;
    }

    operate() {
        let result;
        const number1 = parseFloat(this.previousOperand);
        const number2 = parseFloat(this.currentOperand);
        if(isNaN(number1) || isNaN(number2)) return;

        switch (this.operation) {
            case '+':
                result = this.add(number1, number2);
                break;
            case '-':
                result = this.subtract(number1, number2);
                break;
            case '×':
                result = this.multiply(number1, number2);
                break;
            case '÷':
                result = this.divide(number1, number2);
                break;
            default:
                return;
        }

        this.previousOperand = '';
        this.currentOperand = result;
        this.operation = undefined;
    }
}

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-clear]');
const signButton = document.querySelector('[data-sign]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]')

const calc = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => button.addEventListener('click', () => {
    calc.appendNumber(button.textContent);
    calc.updateDisplay();
}))

operationButtons.forEach(button => button.addEventListener('click', () => {
    calc.selectOperation(button.textContent);
    calc.updateDisplay();
}));

equalsButton.addEventListener('click', () => {
    calc.operate();
    calc.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
})

signButton.addEventListener('click', () => {
    calc.sign();
    calc.updateDisplay();
})