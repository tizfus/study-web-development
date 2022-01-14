window.onload = function(){
    let resetDisplay = true

    const keys = Array.prototype.slice.call(document.getElementsByClassName('key'))
    const numbers = keys.filter(x => x.classList.contains('number'))
    const operators = keys.filter(x => x.classList.contains('operator'))
    const display = document.getElementsByClassName('display')[0]
    const equalsOperator = operators.filter(operator => operator.textContent == '=')[0]

    numbers.forEach(number => number.onclick = appendDigit)
    operators.forEach(operator => operator.onclick = appendOperation)
    
    defaultText()


    function appendDigit() {
        updateText(this.textContent)
    }

    function appendOperation() {
        equalsOperator.onclick = prepareResult(actualText(), this.textContent)
        defaultText()
    }

    function prepareResult(firstlValue, operator) {
        return () => {
            const secondValue = actualText()
            resetDisplay = true
            updateText(calculate(firstlValue, operator, secondValue))
            equalsOperator.onclick = null
            numbers.forEach(number => number.onclick = function(){
                defaultText();
                number.onclick = appendDigit
                number.onclick()
            })
        }
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

    function actualText() { return display.textContent }
    function updateText(text) { 
        resetDisplay ? 
            display.textContent = text : 
            display.textContent += text;
        
        resetDisplay = false
    }
    function defaultText() { display.textContent = '0'; resetDisplay = true }
    
}