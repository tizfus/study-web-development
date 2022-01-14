window.onload = function(){
    let resetDisplay = true

    const keys = Array.prototype.slice.call(document.getElementsByClassName('key'))
    const digit = keys.filter(x => x.classList.contains('number'))
    const operators = keys.filter(x => x.classList.contains('operator'))
    const actions = keys.filter(x => x.classList.contains('action'))
    const display = document.getElementsByClassName('display')[0]
    const equalsOperator = operators.filter(operator => operator.textContent == '=')[0]
    
    operators.forEach(operator => operator.onclick = appendOperation)
    actions.forEach(action => action.onclick = () => runAction(action.textContent))

    setup()

    function setup() {
        cleanDisplay()
        bindDigitOnClick(function() { updateText(this.textContent) })
    }

    function bindDigitOnClick(event) {
        digit.forEach(number => number.onclick = event)
    }

    function appendOperation() {
        equalsOperator.onclick = prepareResult(actualText(), this.textContent)
        cleanDisplay()
    }

    function prepareResult(firstValue, operator) {
        return () => {
            const secondValue = actualText()

            equalsOperator.onclick = () => printResult(actualText(), operator, secondValue)
            printResult(firstValue, operator, secondValue)
        }
    }

    function printResult(firstValue, operator, secondValue) {
        resetDisplay = true
        updateText(calculate(firstValue, operator, secondValue))
    }

    function calculate(firstValue, operator, secondValue) {
        console.log(`${firstValue} ${operator} ${secondValue}`)
        return operation(operator)(
            toInt(firstValue),
            toInt(secondValue)
        )
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

    function runAction(action) {
        switch(action) {
            case 'C':
                equalsOperator.onclick = null
                setup()
                break;
            case '<':
                const newText = actualText().slice(0, -1)
                cleanDisplay()
                if(newText.length != 0) {
                    updateText(newText)
                }
                break;
        } 
    }

    function actualText() { return display.textContent }
    function updateText(text) { 
        resetDisplay ? 
            display.textContent = text : 
            display.textContent += text;
        
        resetDisplay = false
    }
    function cleanDisplay() { display.textContent = '0'; resetDisplay = true }
    
}