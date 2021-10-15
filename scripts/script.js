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
		case add:
			add(a, b);
			break;
		case subtract:
			subtract(a, b);
			break;
		case multiply:
			multiply(a, b);
			break;
		case divide:
			divide(a, b);
			break;
	}
}

const display = document.querySelector(".display-num");
const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");

let displayVlaue = "";

function writeToDisplay(e) {
	if (e.target.getAttribute("class") === "operator") {
		displayVlaue += ` ${e.target.getAttribute("value")} `;
	} else {
		displayVlaue += e.target.getAttribute("value");
	}
	display.textContent = displayVlaue;
}

nums.forEach((element) => {
	element.addEventListener("click", writeToDisplay);
});
operators.forEach((element) => {
	element.addEventListener("click", writeToDisplay);
});
