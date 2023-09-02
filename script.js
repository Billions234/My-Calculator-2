// First, think about a javascript that will make our calculator work.
// How do i store all the information that we type in the calculator, from the button keys to the display in the calculator screen.
// One of the easiest ways to do this is to use a CLASS. so i create a calculator class.

class Calculator { // Inside of this class i put a constructor, which will take all the inputs and functions for the calculator.
    constructor(previousOperandTextElement, currentOperandTextElement) { // The constructor essentially takes in the previous and current Operand.
                                                                        // This is because it need to know where to place the display text for the calculator.
        // Inside we set a variable for the class.
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); // This is here because i want to clear all of the inputs and set them all to the default values as soon as we create a new calculator.
    };
    // Next, think about all the operation the calculator can perform.
    // We have the all-clear function, the delete function, operation functions and the equal function.

    clear() { // This will clear out our different variables
        this.currentOperand = ''; // This is set to default through an empty string.
        this.previousOperand = ''; // This is set to default through an empty string.
        this.operation = undefined; // This is set to undefined, since the user don't have any operation selected. 
    };

    delete() { // This is for removing a single number at a time.
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    appendNumber(number) { // This is essentially what is going to happen every single time a user clicks on a number to add to screen.
                                // This function takes in the particular number that the user selected.
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperation(operation) { // this is what will happen anytime a user clicks on any of the operation signs.
                                // This function takes in the particular operation that the user selected.
                                if (this.currentOperand === '') return;
                                if (this.previousOperand !== '') {
                                    this.compute()
                                };
                                this.operation = operation;
                                this.previousOperand = this.currentOperand;
                                this.currentOperand = '';
    };

    compute() { // This will take the value inside in the calculator and compute a single value for what we need to display in the calculator.
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;

            case '-':
                computation = prev - current;
                break;

            case '×':
                computation = prev * current;
                break;

            case '÷':
                computation = prev / current;
                break;

            default:
                return;
        };
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        };
    };

    updateDisplay() { // This allows us to update the display. This will update the values inside the output(screen).
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        };
    };
    // With these operations all defined. Let's think about the different output the calculator needs to store.
    // I need to know the previous operand the user entered.
    // I need to know the current operand that they are working on.
    // And the operation that the user selected.
};

 // Here are the constants for all our buttons.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
