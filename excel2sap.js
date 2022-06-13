'use strict'
// Prueft an welcher Stelle der Betrag steht.
function findBetragIndex(objects) {
	const EUR = "EUR";
	let betragIndex = null;

	for (const KEY in objects[0]) {
		if (objects[0][KEY] == EUR) {
			betragIndex = KEY - 1;
		}
	}

	return betragIndex;
}

function createOutput(objects, betragIndex) {	
	const outputArea = document.getElementById("outputArea");
	let superString = "";
	let removedRows = 0; 
	let summe = 0;
	
	for (let i = 0; i < objects.length; i++) {
		let tmpTest = objects[i]["0"];
		let count = 0;
		Object.values(objects[i]).forEach(val =>
			(val == tmpTest) ? count++ : count + 0);

		if (objects[i][betragIndex] == "0,00") {
			removedRows++;
			continue;
		} else if (count > 1) {
			removedRows++;
			continue;
		}
		
		summe += parseFloat(objects[i][betragIndex].replace(".","").replace(",","."));
		
		Object.values(objects[i]).forEach(val => 
							superString = superString.concat(val + "\t"));
		superString = superString.slice(0, -1) + "\n";
	}
	
	outputArea.value = superString;
	document.getElementById("statusBox").innerHTML = `Summe: ${summe.toLocaleString("de-DE")}<br>Entfernte Zeilen: ${removedRows}`;
	outputArea.readOnly = true;
	outputArea.select();
}

function clickButton() {
	const inputArea = document.getElementById("inputArea");
	const text = inputArea.value;
	let textArray = text.split("\n");
	let objArray = [];
	let betragIndex = null;

	for (let i = 0; i < textArray.length; i++) {
		let tmpRowArray = textArray[i].split("\t");
		let tmpObj = {};
		// Ein normales Array haette es wahrscheinlich auch getan...
		for (let i = 0; i < tmpRowArray.length; i++) {
			tmpObj[i] = tmpRowArray[i];
		}
		objArray.push(tmpObj);
	}
	betragIndex = findBetragIndex(objArray);
	createOutput(objArray, betragIndex);
}

const buttons = container.querySelectorAll('input');

buttons.forEach(function(btn) {
		const parent = btn.parentNode;
		btn.addEventListener("click", clickButton);
});