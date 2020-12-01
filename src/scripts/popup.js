import * as service from "./service";
import * as pageService from "./pageService";

function initEvents() {
	const modal = document.querySelector(".JS-modal");

	document.querySelector(".JS-modal-cancel").addEventListener("click", () => {
		console.log("toggling");
		modal.classList.toggle("hidden");
	}, { passive: true });

	document.querySelector(".JS-modal-validate").addEventListener("click", () => {
		modal.classList.toggle("hidden");
	}, { passive: true });

	// TODO: Add event listener and updateModal();

	// TODO: Add event on + (for list groups and list item)
}

async function init() {
	//const settings = await service.getSettings();
	//const tab = await service.getTabInfo();
	//console.log({ settings });
	//console.log({ tab });
	// TODO: Hydrate with datas
	// TODO: Select active tab
}

initEvents();
init();
console.log("hello");