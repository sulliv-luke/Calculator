class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        /* removes last number */
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let result
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '÷':
                result = prev / curr
                break
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const floatNumb = parseFloat(number)
        if (isNaN(floatNumb)) return ''
        return floatNumb.toLocaleString('en')
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText = this.getDisplayNumber(this.previousOperand) + ' ' + this.operation 
        } else {
            this.previousOperandText.innerText = this.getDisplayNumber(this.previousOperand)
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete')
const previousOperandText = document.querySelector('[data-previous]')
const currentOperandText = document.querySelector('[data-current]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})