function operate(oper, a, b) {
	switch (oper) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "×":
			return a * b;
		case "÷":
			return a / b;
	}
}

const display = document.querySelector(".display-num");
const nums = document.querySelectorAll(".num");
const decimalPoint = document.querySelector("#decimal");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#operate");
const prev = document.querySelector(".display-prev");
const clearBtn = document.querySelector("#clear-btn");
const deleteBtn = document.querySelector("#delete-btn");
const numberSignBtn = document.querySelector("#number-sign");

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
	element.addEventListener("click", function(e){
		if (!(inputNum1 === "")){
			writeOperDisplay(e);
		}
	});
});

equals.addEventListener("click", function () {

	// First if prevents pressing the = button if there is no operator or the second number

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

deleteBtn.addEventListener("click", function () {
	if (display.textContent == inputNum1) {
		decimalPointUsed = !checkStartEnd(inputNum1, "end", ".");
		inputNum1 = inputNum1.substring(0, inputNum1.length - 1);
		inputNum1 = checkMinusEmpty(inputNum1);
		display.textContent = inputNum1;
		
	} else if (
		(display.textContent === "" || display.textContent === "0") &&
		!(prev.textContent === "")
	) {
		prev.textContent = prev.textContent.substring(0, prev.textContent.length - 2);
		operatorCount = 0;
		display.textContent = prev.textContent;
		prev.textContent = "";
		inputNum1 = display.textContent;

	} else if (display.textContent == inputNum2) {
		decimalPointUsed = !checkStartEnd(inputNum2, "end", ".");
		inputNum2 = inputNum2.substring(0, inputNum2.length - 1);
		inputNum2 = checkMinusEmpty(inputNum2);
		display.textContent = inputNum2;
	}
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

numberSignBtn.addEventListener("click", function(){
	if (display.textContent == inputNum1){
		inputNum1 = changeNumberSign(inputNum1);
	} else if (display.textContent == inputNum2){
		inputNum2 = changeNumberSign(inputNum2);
	}
})

function writeNumDisplay(e) {
	if (operatorCount === 0) {
		inputNum1 += e.target.getAttribute("value");
		
		// Checks if the number starts with 0 like 0235 and removes the 0 so it's only 235 
		
		inputNum1 =
			checkStartEnd(inputNum1, "start", "0") && inputNum1.length > 1
				? inputNum1.replace("0", "")
				: inputNum1;

		// Checks if the number starts with . like .235 and adds a 0 so the number becomes 0.235 

		inputNum1 = checkStartEnd(inputNum1, "start", ".")
			? "0" + inputNum1
			: inputNum1;


		display.textContent = inputNum1;
	} else if (operatorCount === 1) {
		prev.textContent = inputNum1 + ` ${operatorValue} `;
		inputNum2 += e.target.getAttribute("value");

		// Same checks but for the other number

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

		//Checks if the number ends with . like 235. and removes the . so it's 235

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
			calculate(operationComplete, false);
		}
		display.textContent = "";
		prev.textContent = inputNum1 + ` ${operatorValue} `;
	}
	operatorValueOld = operatorValue;
}

function calculate(value, equals) {
	let numArray = value.split(` ${operatorValueOld} `);

	numArray = numArray.map((element) => parseFloat(element.trim()));

	let result = operate(operatorValueOld, numArray[0], numArray[1]);
	result = Math.round(result * 1000) / 1000;
	decimalPointUsed = false;

	if (equals) {
		inputNum1 = String(result);
		inputNum2 = "";
		display.textContent = result;
		prev.textContent = value + " =";
	} else {
		inputNum1 = String(result);
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

function checkMinusEmpty(num) {
	if (num === "") {
		return "0";
	} else if (num === "-") {
		return "0";
	} else {
		return num;
	}
}

function removeFirstChar (string){
	string = string.split("")
	string.shift()
	return string.join("")
}

function changeNumberSign (num){
	if (checkStartEnd(num, "start", "-")){
		num = removeFirstChar(num);
		display.textContent = num;
		return num
		
	} else {
		num = "-" + num;
		display.textContent = num;
		return num
	}
}