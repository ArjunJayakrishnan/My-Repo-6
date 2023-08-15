import * as constants from "./constants.js";
import * as newJson from "./newJson.js";
// import "core-js/stable";
// import "regenerator-runtime/runtime";

export async function fetchData() {
	const response = await fetch("data.json");
	const data = await response.json();
	return data;
}

// max Amount of data.json file
export async function getMaxAmt() {
	try {
		const response = await fetch("data.json");
		const data = await response.json();
		let amounts = [];
		data.forEach((el) => {
			amounts.push(el.amount);
		});
		const sortedAmt = amounts.sort((a, b) => b - a);
		// return console.log(sortedAmt);
		return sortedAmt[constants.FIRST_EL_OF_ARRAY];
	} catch (error) {
		alert("Error fetching JSON:", error);
	}
}

// days only array
export async function fetchDays() {
	try {
		const response = await fetch("data.json");
		const data = await response.json();
		let days = [];
		data.forEach((el) => {
			days.push(el.day);
		});
		return days;
	} catch (error) {
		alert("Error fetching JSON:", error);
	}
}

// TO adjust height properly/ to keep a standrd for height
export async function nearestLimit() {
	let limit;
	const max = await getMaxAmt();
	if (max < constants.CHECK_DOUBLE_DIGIT) {
		const magicNo = 100 - max;
		const secondDigit = Math.ceil(magicNo) % 10;
		limit = max + secondDigit + constants.TO_REACH_LIMIT;
	}
	return Math.round(limit);
}

// iife
(async function () {
	try {
		const data = await newJson.getJson();
		// const bars = document.querySelectorAll(".bar");
		const max = await newJson.getMaxHeight();
		data.forEach((obj) => {
			const { day, amount } = obj;
			const bar = document.querySelector(`.${day}`);
			bar.style.height = `${amount}px`;
			if (amount === max) {
				bar.classList.add("highest");
			}
		});
	} catch (error) {
		alert("wait for exactly 3 secs...", error);
	}
})();
