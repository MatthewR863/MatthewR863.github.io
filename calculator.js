
let validResults = [];
let calculationTable = "";

function calculate(x, y, operator) {
    let result;

    switch(operator) {
        case '+':
            result = x + y;
            break;
        case '-':
            result = x - y;
            break;
        case '*':
            result = x * y;
            break;
        case '/':
            result = y !== 0 ? x / y : "computation error";
            break;
        case '%':
            result = x % y;
            break;
        default:
            result = "computation error";
    }

    return result;
}

function isValidNumber(input) {
    return !isNaN(input) && input !== "" && input !== null;
}

function runCalculator() {
    let continueCalculations = true;

    calculationTable = "<table>";
    calculationTable += "<tr><th>x</th><th>op</th><th>y</th><th>result</th></tr>";

    while (continueCalculations) {
        let xInput = prompt("Enter first number (x):");

        if (xInput === null) {
            break;
        }

        let operator = prompt("Enter operator (+, -, *, /, %):");

        if (operator === null) {
            break;
        }

        let yInput = prompt("Enter second number (y):");

        if (yInput === null) {
            break;
        }

        // Convert inputs to numbers
        let x = parseFloat(xInput);
        let y = parseFloat(yInput);
        let result;

        if (!isValidNumber(xInput) || !isValidNumber(yInput)) {
            result = "wrong input number";
        } else {
            result = calculate(x, y, operator);

            if (typeof result === 'number' && !isNaN(result)) {
                validResults.push(result);
            }
        }

        calculationTable += "<tr><td>" + xInput + "</td><td>" + operator + "</td><td>" + yInput + "</td><td>" + result + "</td></tr>";

        let continueInput = confirm("If you want to continue Click OK to continue or Cancel to exit and view.");
        if (!continueInput) {
            continueCalculations = false;
        }
    }

    calculationTable += "</table>";

    let summaryTable = "";
    if (validResults.length > 0) {
        let min = Math.min(...validResults);
        let max = Math.max(...validResults);
        let total = validResults.reduce((sum, val) => sum + val, 0);
        let avg = total / validResults.length;

        summaryTable = "<table>";
        summaryTable += "<tr><th>Min</th><th>Max</th><th>Average</th><th>Total</th></tr>";
        summaryTable += "<tr><td>" + min + "</td><td>" + max + "</td><td>" + avg + "</td><td>" + total + "</td></tr>";
        summaryTable += "</table>";
    } else {
        summaryTable = "<p>No valid calculations to summarize.</p>";
    }

    let content = document.getElementById('calculator-content');
    content.innerHTML = calculationTable + summaryTable;
}

if (typeof window !== 'undefined') {
    window.onload = runCalculator;
} else if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', runCalculator);
} else {
    runCalculator();
}
