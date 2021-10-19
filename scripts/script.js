function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(oper, a, b) {
	switch (oper) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "×":
			return multiply(a, b);
		case "÷":
			return divide(a, b);
	}
}

const display = document.querySelector(".display-num");
const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#operate");
const prevOper = document.querySelector(".display-prev");

let displayVlaue = "";
let operatorValue = "";
let operatorCount = 0;
let operatorValueNew = "";

function writeToNumDisplay(e) {
	if (e.target.getAttribute("class") === "operator") {
		if (operatorCount === 2) {

			/* Passes the newly pressed operator so that it can be used for displaying the next operation to the user, also allows the calculate to use the previous operator to get the needed result */
			
			operatorValueNew = e.target.getAttribute("value"); 
			calculate(true);

			/* After the calculation sets the operator to the current one so that the user can use the "=" button and get the correct result */
			operatorValue = e.target.getAttribute("value");
			operatorCount = 1;
		} else {
			operatorValue = e.target.getAttribute("value");
			prevOper.textContent = displayVlaue + ` ${operatorValue} `;
			operatorCount++;
		}
	} else {
		if (operatorCount === 1) {
			displayVlaue = "";
			operatorCount++;
		}
		displayVlaue += e.target.getAttribute("value");
		display.textContent = displayVlaue;
	}
}

nums.forEach((element) => {
	element.addEventListener("click", writeToNumDisplay);
});
operators.forEach((element) => {
	element.addEventListener("click", writeToNumDisplay);
});

equals.addEventListener("click", function () {
	calculate(false);
});

function calculate(toPrev) {
	let numInput1 = parseFloat(
		prevOper.textContent.slice(0, prevOper.textContent.length - 3)
	);
	let numInput2 = parseFloat(displayVlaue);
	let operationString = `${numInput1} ${operatorValue} ${numInput2} =`;
	let result = operate(operatorValue, numInput1, numInput2);
	displayResult(result, operationString, toPrev);
}

function displayResult(value, string, toPrev) {
	if (toPrev) {
		prevOper.textContent = `${value} ${operatorValueNew} `;
	} else {
		prevOper.textContent = string;
		display.textContent = value;
	}
}
