window.onload = function(){
    const status = {
        resetDisplay: true,
        operator: '+',
        firstValue: 0,
        secondValue: 0,

        reset(){
            this.operator = '+'
            this.firstValue = 0
            this.secondValue = 0
        }
    }
    const keys = Array.prototype.slice.call(document.getElementsByClassName('key'))
    const numbers = keys.filter(x => x.classList.contains('number'))
    const operators = keys.filter(x => x.classList.contains('operator'))
    const display = document.getElementsByClassName('display')[0]
    const equalsOperator = operators.filter(operator => operator.textContent == '=')[0]

    numbers.forEach(number => number.onclick = appendDigit)
    operators.forEach(operator => operator.onclick = appendOperation)
    equalsOperator.onclick = printResult
    defaultText()


    function appendDigit() {
        updateText(this.textContent)
    }

    function appendOperation() {
        status.firstValue = actualText()
        status.operator = this.textContent
        status.resetDisplay = true
    }

    function printResult(){
        status.secondValue = actualText()
        defaultText()
        updateText(calculate())
    }

    function calculate(){
        const result =  operation(status.operator)(
            toInt(status.firstValue),
            toInt(status.secondValue)
        )
        status.reset()
        return result
    }

    function toInt(num) { return +num }

    function operation(operator) {
        switch(operator) {
            case '-':
                return (a,b) => a - b

            case '+':
                return (a,b) => a + b

            case '*':
                return (a,b) => a * b
            
            case '/':
                return (a,b) => a / b
        } 
    }

    function actualText() { return display.textContent }
    function updateText(text) { 
        status.resetDisplay ? 
            display.textContent = text : 
            display.textContent += text;
        
        status.resetDisplay = false
    }
    function defaultText() { display.textContent = '0'; status.resetDisplay = true }
    
}