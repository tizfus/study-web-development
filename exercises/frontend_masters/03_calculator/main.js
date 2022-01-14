window.onload = function(){
    const keys = Array.prototype.slice.call(document.getElementsByClassName('key'))
    const digit = keys.filter(x => x.classList.contains('number'))
    const display = document.getElementsByClassName('display')[0]
    const actions = keys.filter(x => x.classList.contains('action'))
    const operators = keys.filter(x => x.classList.contains('operator'))
    operators.forEach(operator => operator.onclick = operatorOnClick)
    const equalsOperator = operators.filter(operator => operator.textContent == '=')[0]
    
    const operation = {}
    operation['-'] = (a,b) => a - b;
    operation['+'] = (a,b) => a + b;
    operation['*'] = (a,b) => a * b;
    operation['/'] = (a,b) => a / b;


    const action = {}
    action['C'] = () => setup()
    action['<'] = () => writeText(actualText().slice(0, -1))

    actions.forEach(act => act.onclick = action[act.textContent])
    
    
    setup()

    function setup() {
        equalsOperator.onclick = null
        cleanDisplay()
        enableOverrideDigit()
    }

    function bindAllDigit(event){ digit.forEach(number => number.onclick = event) }
    function enableOverrideDigit() {
        bindAllDigit(function() {
            writeText(this.textContent)
            
            bindAllDigit(function() {
                actualText() === '0' ?
                    writeText(this.textContent)
                    : appendText(this.textContent) 
            })
        })
    }

    function operatorOnClick() {
        equalsOperator.onclick = prepareResult(actualText(), this.textContent)
        enableOverrideDigit()
    }

    function prepareResult(firstValue, operator) {
        return () => {
            const secondValue = actualText()

            equalsOperator.onclick = () => printResult(actualText(), operator, secondValue)
            printResult(firstValue, operator, secondValue)
        }
    }

    function printResult(firstValue, operator, secondValue) { writeText(calculate(firstValue, operator, secondValue)) }

    function calculate(firstValue, operator, secondValue) {
        console.log(`${firstValue} ${operator} ${secondValue}`)
        return operation[operator](
            toInt(firstValue),
            toInt(secondValue)
        )
    }

    function toInt(num) { return +num }

    function actualText() { return display.textContent }
    function appendText(text) { display.textContent += text }
    function writeText(text) { display.textContent = text || '0' }

    function cleanDisplay() { display.textContent = '0'; }
    
}