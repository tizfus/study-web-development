window.onload = function(){
    const status = {
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
    display.textContent = '0'


    function appendDigit() {
        if(display.textContent == '0') {
            display.textContent = this.textContent
            return
        }
        display.textContent += this.textContent
    }

    function appendOperation() {
        status.firstValue = display.textContent
        status.operator = this.textContent
        display.textContent = '0'
    }

    function printResult(){
        status.secondValue = display.textContent
        display.textContent = calculate()
    }

    function calculate(){
        const result =  operation(status.operator)(
            toInt(status.firstValue),
            toInt(status.secondValue)
        )
        status.reset()
        return result
    }

    function toInt(string) { return +string }

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
}