import * as script from "./script.js";
import * as constants from "./constants.js";

// Naming
const floatingDivs = document.querySelectorAll(".bar-value");
const container = document.querySelector("body");

// Functions
function floatingDivAppearance() {
	container.addEventListener("click", function (event) {
		const target = event.target;
		if (target.classList.contains("bar")) {
			const targetBar = target.classList[constants.SECOND_EL_OF_ARRAY];
			floatingDivs.forEach(function (div) {
				div.classList.add("hidden");
				const targetFloatingDiv = div.getAttribute("data-target");
				if (targetFloatingDiv === targetBar) {
					div.classList.remove("hidden");
				} else return;
			});
		} else if (target.classList.contains("bar") === false) {
			floatingDivs.forEach(function (div) {
				div.classList.add("hidden");
			});
		}
	});
	displayFloatingDivAmt();
}

async function displayFloatingDivAmt() {
	let displayedAmt;
	const data = await script.fetchData();
	container.addEventListener("click", function (event) {
		const target = event.target;
		if (target.classList.contains("bar")) {
			const targetBar = target.classList[constants.SECOND_EL_OF_ARRAY];
			data.forEach((obj) => {
				const { day, amount } = obj;
				if (day === targetBar) {
					displayedAmt = amount;
				}
			});
			floatingDivs.forEach(function (div) {
				const targetFloatingDiv = div.getAttribute("data-target");
				if (targetFloatingDiv === targetBar) {
					div.textContent = `$${displayedAmt}`;
				} else return;
			});
		}
	});
}

// Action
document.addEventListener("DOMContentLoaded", floatingDivAppearance);
