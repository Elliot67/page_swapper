import * as service from "./service";
import * as pageService from "./pageService";
import { Group } from "./classes";

let groups = [];
let activeGroup;
const modal = document.querySelector(".JS-modal");
let currentGroup = null;
let currentItem = null;

function initEvents() {
	// Outside to inside modal
	document.querySelector(".JS-new-group").addEventListener("click", newGroup, { passive: true });
	document.querySelector(".JS-group-list-container").addEventListener("click", editGroup, { passive: true });

	// Inside modal
	document.querySelector(".JS-new-item").addEventListener("click", addItem, { passive: true });

	// Inside modal to outside
	document.querySelector(".JS-modal-validate").addEventListener("click", validateModal, { passive: true });
	document.querySelector(".JS-modal-cancel").addEventListener("click", closeModal, { passive: true });
	document.querySelector(".JS-modal-delete").addEventListener("click", deleteModal, { passive: true });

	// Import / Export
	document.querySelector(".JS-export-config").addEventListener("click", exportConfig, { passive: true });
	document.querySelector(".JS-import-config").addEventListener("change", importConfig, { passive: true });
}

function exportConfig() {
	const data = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ "groups-v1": groups }));
	const anchor = document.createElement("a");
	anchor.setAttribute("href", data);
	anchor.setAttribute("download", "page-swapper-config.json");
	anchor.click();
	anchor.remove();
}

function importConfig() {
	const fileInput = document.querySelector(".JS-import-config");
	if (fileInput.files.length === 1) {
		const reader = new FileReader();
		reader.onload = readImportedFile;
		reader.readAsText(fileInput.files[0]);
	}
	fileInput.value = "";
}

async function readImportedFile(event) {
	const config = JSON.parse(event.target.result);
	importGroupsObjects(config["groups-v1"], false);
	await service.setGroupsToSettings(groups);
	pageService.updateListGroup(groups, false);
}

async function deleteModal() {
	const groupIndex = groups.findIndex((group) => group.id === activeGroup.id);
	groups.splice(groupIndex, 1);
	await service.setGroupsToSettings(groups);
	pageService.updateListGroup(groups, false);
	closeModal();
}

async function newGroup() {
	await openModal(true);
	activeGroup = new Group();
	pageService.updateModal(activeGroup);
}

function addItem() {
	activeGroup.hydrateWithForm();
	activeGroup.createItem();
	pageService.updateModal(activeGroup, false);
}

async function validateModal() {
	activeGroup.hydrateWithForm(true);
	if (activeGroup.id === null) {
		activeGroup.generateId();
		groups.push(activeGroup);
	}
	await service.setGroupsToSettings(groups);
	pageService.updateListGroup(groups, false);
	closeModal();
}

async function openModal(isNew = false, animationOrigin = null) {
	modal.classList.add(isNew ? "new" : "edit");

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
	await service.sleep(0);
	transition.style.height = "100%";
	transition.style.width = "100%";
	transition.style.left = 0;
	transition.style.top = 0;
	transition.style.backgroundColor = `var(--bg-dark)`;
	await service.sleep(0.4); // animation duration
	transition.classList.add("hidden");
}

function closeModal() {
	document.querySelector("html").style.overflowY = "scroll";
	document.querySelector("body").style.overflowY = "scroll";
	modal.style.overflowY = "hidden";
	modal.classList.toggle("hidden");
	activeGroup = null;

	modal.classList.remove("edit", "new");
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

	await openModal(false, groupElement);
	activeGroup = groups.find((group) => group.id === dataElement.dataset.id);
	pageService.updateModal(activeGroup);
}

function importGroupsObjects(groupsObjects) {
	groupsObjects.forEach((groupObject) => {
		const newGroup = new Group();
		newGroup.hydrateWithObject(groupObject);
		groups.push(newGroup);
	});
}

async function findCurrentItem() { // TODO: Far from perfect
	const currentTab = await service.getTabInfo();
	const url = new URL(currentTab.url);

	console.log(url);

	// href - origin

	for (const group of groups) {
		const isFound = group.items.find((item) => url.href.match(new RegExp(item.domain)));
		if (isFound) {
			currentGroup = group;
			currentItem = isFound;
			return;
		}
	}
}


async function init() {
	const groupsObjects = await service.getGroupsFromSettings();
	console.log("groups objects", groupsObjects);
	importGroupsObjects(groupsObjects);
	pageService.updateListGroup(groups);

	await findCurrentItem();
	pageService.updateHead(currentGroup, currentItem);
	console.log(currentGroup, currentItem);

	// TODO: Update First Section
	// TODO: Add event listener on the form for the modal item delete button
	// TODO: Update first section after editing a group
}

initEvents();
init();