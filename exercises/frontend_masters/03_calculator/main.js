window.onload = function(){
    let operations = []
    let clean = true

    const keys = Array.prototype.slice.call(document.getElementsByClassName('key'))
    const numbers = keys.filter(x => x.parentNode.classList.contains('numbers'))
    const operators = keys.filter(x => x.parentNode.classList.contains('operators'))
    const display = document.getElementsByClassName('display')[0]
    const equalsOperator = operators.filter(operator => operator.textContent == '=')[0]



    numbers.forEach(number => number.onclick = appendDigit)
    operators.forEach(operator => operator.onclick = appendOperation)
    equalsOperator.onclick = printResult



    function appendDigit() {
        if(clean) { clear() }
        display.textContent += this.textContent
    }

    function appendOperation() {
        operations.push(display.textContent)
        operations.push(operation(this.textContent))
        console.log(operations)
        clear()
    }

    function printResult(){
        operations.push(display.textContent)
        clean = true
        display.textContent = calculate(0, operations)
    }

    function calculate(initValue, operations){
        console.debug(`${initValue} # ${operations}`)
        
        if(operations.length == 0) {
            return initValue
        }
        
        const item = operations.shift()

        if(typeof(item) == 'function'){
            const operation = item
            const number = toInt(operations.shift())
            
            return calculate(operation(initValue, number), operations)
        }
        
        return calculate(toInt(item), operations)
    

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

    function clear() { 
        clean = false
        display.textContent = '' 
    }
}