import * as script from "./script.js";
import * as constants from "./constants.js";

// heights only array
export async function getHeight() {
	try {
		const response = await fetch("data.json");
		const data = await response.json();
		let amounts = [];
		data.forEach((el) => {
			amounts.push(el.amount);
		});
		const x = (await script.nearestLimit()) / constants.HEIGHT_OF_BAR;
		const heights = amounts.map((amount) => amount / x);
		return heights;
	} catch (error) {
		alert("Error fetching JSON:", error);
	}
}

// json format array with day and height in px
export async function getJson() {
	const daysOfWeek = await script.fetchDays();
	const heights = await getHeight();
	const jsonData = daysOfWeek.map((day, i) => ({
		day,
		amount: heights[i],
	}));
	return jsonData;
}

// highest of height of the above json
export async function getMaxHeight() {
	try {
		const data = await getJson();
		// return console.log(data[2]);
		let heights = [];
		data.forEach((el) => {
			heights.push(el.amount);
		});
		const sortedHeight = heights.sort((a, b) => b - a);
		return sortedHeight[constants.FIRST_EL_OF_ARRAY];
	} catch (error) {
		alert("Error fetching JSON:", error);
	}
}
