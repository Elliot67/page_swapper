import * as service from "./service";
import * as pageService from "./pageService";
import { Group } from "./classes";

let groups = [];
let activeGroup;
const modal = document.querySelector(".JS-modal");

function initEvents() {
	document.querySelector(".JS-modal-cancel").addEventListener("click", closeModal, { passive: true });
	document.querySelector(".JS-new-group").addEventListener("click", newGroup, { passive: true });
	document.querySelector(".JS-new-item").addEventListener("click", addItem, { passive: true });
	document.querySelector(".JS-modal-validate").addEventListener("click", validateModal, { passive: true });
	// TODO: When pressing enter swap between input and validateModal if there is no input left
}

function newGroup() {
	openModal();
	activeGroup = new Group();
	pageService.updateModal(activeGroup);
}

function addItem() {
	activeGroup.hydrateWithForm();
	activeGroup.createItem();
	pageService.updateModal(activeGroup);
}

function validateModal() {
	activeGroup.hydrateWithForm();
	groups.push(activeGroup);
	service.setSettings(groups);
	pageService.updateListGroup(groups);
	closeModal();
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