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
// 	let table = document.createElement("table");		
// 	document.getElementById("outputBox").appendChild(table);

//   for (var i = 0; i < objects.length; i++) {	
//     let tr = document.createElement("tr");
//     table.appendChild(tr);
	
// 	if (objects[i].betrag == "0,00") {
// 		continue;
// 	}

//     let td1 = document.createElement("td");
// 	let td2 = document.createElement("td");
// 	let td3 = document.createElement("td");
// 	let td4 = document.createElement("td");
// 	let td5 = document.createElement("td");
// 	let td6 = document.createElement("td");
// 	td1.innerHTML = objects[i].kostenstelleAlt;
//     td2.innerHTML = objects[i].iaAlt;
// 	td3.innerHTML = objects[i].kostenart;
// 	td4.innerHTML = objects[i].betrag;
// 	td5.innerHTML = objects[i].eur;
// 	td6.innerHTML = objects[i].kostenstelleNeu;
// 	tr.appendChild(td1);
// 	tr.appendChild(td2);
// 	tr.appendChild(td3);
// 	tr.appendChild(td4);
// 	tr.appendChild(td5);
// 	tr.appendChild(td6);
//   }

	let outputArea = document.createElement("textarea");
	let superString = "";
	let removedRows = 0; // Ungenutzt
	let summe = 0;
	
  outputArea.setAttribute("cols", "100");
  outputArea.setAttribute("rows", "20");
	outputArea.setAttribute("id", "outputArea");
	
	for (let i = 0; i < objects.length; i++) {
		summe += parseFloat(objects[i][betragIndex].replace(",","."));

		if (objects[i][betragIndex] == "0,00") {
			removedRows++;
			continue;
		}
		Object.values(objects[i]).forEach(val => 
							superString = superString.concat(val + "\t"));
		superString = superString.slice(0, -1) + "\n";
	}
	
	outputArea.value = superString;	
	document.getElementById("outputBox").appendChild(outputArea);
	outputArea.select();
	alert(summe);
}

function clickButton() {
	const textArea = document.querySelector("textarea");
	const text = textArea.value;
	let textArray = text.split("\n");
	let objArray = [];
	let betragIndex = null;

	for (let i = 0; i < textArray.length; i++) {
		let tmpRowArray = textArray[i].split("\t");
		let tmpObj = {};

		for (let i = 0; i < tmpRowArray.length; i++) {
			tmpObj[i] = tmpRowArray[i];
		}
		objArray.push(tmpObj);
	}
	betragIndex = findBetragIndex(objArray);

	document.getElementById("controlBox").innerHTML = parseFloat("2,5".replace(",",".")) * 10;
	createOutput(objArray, betragIndex);
}

const control = document.getElementById('controlBox');
const buttons = container.querySelectorAll('input');

buttons.forEach(function(btn) {
		const parent = btn.parentNode;
		btn.addEventListener("click", clickButton);
});
