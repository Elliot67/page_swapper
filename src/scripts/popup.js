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
	document.querySelector(".JS-group-list-container").addEventListener("click", editGroup, { passive: true });
}

async function newGroup() {
	await openModal();
	activeGroup = new Group();
	pageService.updateModal(activeGroup);
}

function addItem() {
	activeGroup.hydrateWithForm();
	activeGroup.createItem();
	pageService.updateModal(activeGroup, false);
}

function validateModal() {
	activeGroup.hydrateWithForm(true);
	if (activeGroup.id === null) {
		activeGroup.generateId();
		groups.push(activeGroup);
	}
	service.setSettings(groups);
	pageService.updateListGroup(groups);
	closeModal();
}

async function openModal(animationOrigin = null) {

	if (animationOrigin !== null) {
		await animateModalOpen(animationOrigin);
	}

	modal.classList.remove('hidden');
	document.querySelector("html").style.overflowY = "hidden";
	document.querySelector("body").style.overflowY = "hidden";
	document.querySelector(".JS-transition").classList.add("hidden");
	modal.style.overflowY = "scroll";
	document.querySelector(".JS-modal-name-input").focus();
}

async function animateModalOpen(animationOrigin) {
	const data = animationOrigin.getBoundingClientRect();
	const transition = document.querySelector(".JS-transition");

	transition.style.height = `${data.height}px`;
	transition.style.width = `${data.width}px`;
	transition.style.left = `${data.left}px`;
	transition.style.top = `${data.top}px`;
	transition.style.backgroundColor = `var(--bg-medium)`;
	transition.classList.remove("hidden");
	await sleep(0);
	transition.style.height = "100%";
	transition.style.width = "100%";
	transition.style.left = 0;
	transition.style.top = 0;
	transition.style.backgroundColor = `var(--bg-dark)`;
	await sleep(0.4); // animation duration
	transition.classList.add("hidden");
}

function closeModal() {
	document.querySelector("html").style.overflowY = "scroll";
	document.querySelector("body").style.overflowY = "scroll";
	modal.style.overflowY = "hidden";
	modal.classList.toggle("hidden");
	activeGroup = null;
}

async function editGroup(event) {
	const clickedItem = event.path[0];
	let groupElement;
	let dataElement;

	if (clickedItem.classList.contains("JS-group-list-item")) { // 1st layer
		groupElement = event.path[1];
		dataElement = clickedItem;
	} else if (clickedItem.classList.contains("JS-group-list-container-item")) { // middle layer
		groupElement = clickedItem;
		dataElement = clickedItem.querySelector(".JS-group-list-item");
	} else {
		return;
	}

	await openModal(groupElement);
	activeGroup = groups.find((group) => group.id === dataElement.dataset.id);
	pageService.updateModal(activeGroup);
}

function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
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