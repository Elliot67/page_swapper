import * as service from "./service";
import * as pageService from "./pageService";
import { Group } from "./classes";

let groups = [];
let activeGroup;
const modal = document.querySelector(".JS-modal");

function initEvents() {

	document.querySelector(".JS-modal-cancel").addEventListener("click", () => {
		closeModal();
	}, { passive: true });

	document.querySelector(".JS-modal-validate").addEventListener("click", () => {
		groups.push(activeGroup);
		service.setSettings(groups);
		closeModal();
	}, { passive: true });

	document.querySelector(".JS-new-group").addEventListener("click", () => {
		openModal();
		activeGroup = new Group();
		pageService.updateModal(activeGroup);
	}, { passive: true });

	document.querySelector(".JS-new-item").addEventListener("click", () => {
		activeGroup.createItem();
		pageService.updateModal(activeGroup);
	}, { passive: true });
}

function openModal() {
	modal.classList.remove('hidden');
	document.querySelector("html").style.overflowY = "hidden";
	document.querySelector("body").style.overflowY = "hidden";
	modal.style.overflowY = "scroll";
}

function closeModal() {
	document.querySelector("html").style.overflowY = "scroll";
	document.querySelector("body").style.overflowY = "scroll";
	modal.style.overflowY = "hidden";
	modal.classList.toggle("hidden");
	activeGroup = null;
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