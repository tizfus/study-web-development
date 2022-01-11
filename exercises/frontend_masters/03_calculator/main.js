window.onload = function(){
    let calculation = []

    const keys = Array.prototype.slice.call(
        document.getElementsByClassName('key')
    )

    const numbers = keys.filter(x => x.parentNode.classList.contains('numbers'))
    const operators = keys.filter(x => x.parentNode.classList.contains('operators'))

    const display = document.getElementsByClassName('display')[0]

    for(let number of numbers) {
        number.onclick = function() {
            display.textContent += this.textContent
        }
    }

    operators.forEach(operator => 
        operator.onclick = function () {
            calculation.push(display.textContent)
            calculation.push(operation(operator.textContent))
            console.log(calculation)
            display.textContent = ''
        }
    );

    const equalsOperator = operators.filter(operator => operator.textContent == '=')[0]

    equalsOperator.onclick = () => {
        calculation.push(display.textContent)
        display.textContent = calculate(0, calculation)
    }


    function calculate(initValue, calcs){
        console.debug(`${initValue} # ${calcs}`)
        
        if(calcs.length == 0) {
            return 0
        }
        
        const item = calcs.shift()

        if(typeof(item) == 'function'){
            const operation = item
            const number = toInt(calcs.shift())
            
            return operation(initValue, number)
        }
        
        return calculate(toInt(item), calcs)
    

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