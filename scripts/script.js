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
const decimalPoint = document.querySelector("#decimal");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#operate");
const prev = document.querySelector(".display-prev");
const clearBtn = document.querySelector("#clear-btn");

let inputNum1 = "";
let inputNum2 = "";
let operatorCount = 0;
let operatorValue = "";
let operationComplete = "";
let operatorValueOld = "";
let decimalPointUsed = false;

nums.forEach((element) => {
	element.addEventListener("click", writeNumDisplay);
});
operators.forEach((element) => {
	element.addEventListener("click", writeOperDisplay);
});

equals.addEventListener("click", function () {
	if (!isNaN(parseFloat(prev.textContent)) && !isNaN(parseFloat(inputNum2))) {
		if (divideZeroCheck(true)) {
			return;
		}
		inputNum2 = checkStartEnd(inputNum2, "end", ".")
			? inputNum2.replace(".", "")
			: inputNum2;
		operationComplete = inputNum1 + ` ${operatorValue} ` + inputNum2;
		calculate(operationComplete, true);
	}
});

clearBtn.addEventListener("click", function () {
	inputNum1 = "";
	inputNum2 = "";
	operatorCount = 0;
	operatorValue = "";
	operationComplete = "";
	operatorValueOld = "";
	display.textContent = "0";
	prev.textContent = "";
	decimalPointUsed = false;
});

decimalPoint.addEventListener("click", function (e) {
	if (!decimalPointUsed) {
		if (operatorCount === 0) {
			inputNum1 += e.target.getAttribute("value");
			display.textContent = inputNum1;
			decimalPointUsed = true;
		} else {
			inputNum2 += e.target.getAttribute("value");
			display.textContent = inputNum2;
			decimalPointUsed = true;
		}
	}
});

function writeNumDisplay(e) {
	if (operatorCount === 0) {
		inputNum1 += e.target.getAttribute("value");
		inputNum1 =
			checkStartEnd(inputNum1, "start", "0") && inputNum1.length > 1
				? inputNum1.replace("0", "")
				: inputNum1;
		inputNum1 = checkStartEnd(inputNum1, "start", ".")
			? "0" + inputNum1
			: inputNum1;
		display.textContent = inputNum1;
	} else if (operatorCount === 1) {
		prev.textContent = inputNum1 + ` ${operatorValue} `;
		inputNum2 += e.target.getAttribute("value");
		inputNum2 =
			checkStartEnd(inputNum2, "start", "0") && inputNum2.length > 1
				? inputNum2.replace("0", "")
				: inputNum2;
		inputNum2 = checkStartEnd(inputNum2, "start", ".")
			? "0" + inputNum2
			: inputNum2;
		display.textContent = inputNum2;
	}
}

function writeOperDisplay(e) {
	operatorValue = e.target.getAttribute("value");
	if (operatorCount === 0) {
		inputNum1 = checkStartEnd(inputNum1, "end", ".")
			? inputNum1.replace(".", "")
			: inputNum1;
		prev.textContent = inputNum1 + ` ${operatorValue} `;
		display.textContent = "";
		decimalPointUsed = false;
		operatorCount++;
	} else if (operatorCount === 1) {
		if (!(inputNum2 === "")) {
			if (divideZeroCheck(false)) {
				return;
			}

			operationComplete = prev.textContent + inputNum2;
			console.log(operationComplete);
			calculate(operationComplete, false);
		}
		display.textContent = "";
		prev.textContent = inputNum1 + ` ${operatorValue} `;
	}
	operatorValueOld = operatorValue;
}

function calculate(value, equals) {
	let numArray = value.split(`${operatorValueOld}`);

	//Splita  - i u broju i kao operaciju -10 - 20 => ["", "10 ", " 20"]
	numArray = numArray.filter(el => !(el === ""));
	numArray = numArray.map((element) => parseFloat(element.trim()));
	
	console.log(numArray)
	let result = operate(operatorValueOld, numArray[0], numArray[1]);
	result = Math.round(result * 1000) / 1000;
	decimalPointUsed = false;
	if (equals) {
		inputNum1 = result;
		inputNum2 = "";
		display.textContent = result;
		prev.textContent = value + " =";
	} else {
		inputNum1 = result;
		inputNum2 = "";
		display.textContent = "";
	}
}

function divideZeroCheck(equals) {
	if (equals) {
		if (operatorValue === "÷" && inputNum2 === "0") {
			alert("You cannot divide by zero!");
			inputNum2 = "";
			display.textContent = "";
			return true;
		}
	}
	if (operatorValueOld === "÷" && inputNum2 === "0") {
		alert("You cannot divide by zero!");
		inputNum2 = "";
		display.textContent = "";
		return true;
	}
}

function checkStartEnd(string, val, char) {
	if (val === "start") {
		return string.startsWith(char);
	} else if (val === "end") {
		return string.endsWith(char);
	}
}
