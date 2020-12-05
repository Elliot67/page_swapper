import { groupColors } from "./classes";

export function updateModal(Group, withAnimation = true) {
	console.log("UPDATING MODAL", Group);
	const topBar = document.querySelector(".JS-modal-bar");
	topBar.classList.remove(...groupColors);
	topBar.classList.add(Group.color);
	document.querySelector(".JS-modal-name-input").value = Group.name;

	const elementsContainer = document.querySelector(".JS-modal-input-container");
	elementsContainer.innerHTML = "";
	let dataAnimation = 4;
	Group.items.forEach((item) => {
		const hydratedInput = hydrateInputGroup(getInputGroup(), item);
		if (dataAnimation !== null && withAnimation) {
			hydratedInput.querySelector("*").dataset.anim = dataAnimation;
			dataAnimation = dataAnimation < 9 && dataAnimation !== null ? dataAnimation + 1 : null;
		}
		elementsContainer.appendChild(hydratedInput);
	});
}

export function updateListGroup(groupList = [], withAnimation = true) {
	const elementsContainer = document.querySelector(".JS-group-list-container");
	elementsContainer.innerHTML = "";
	let dataAnimation = 4;
	groupList.forEach((group) => {
		const hydratedListGroup = hydrateListGroup(getListGroup(), group);
		if (dataAnimation !== null && withAnimation) {
			hydratedListGroup.querySelector("*").dataset.anim = dataAnimation;
			dataAnimation = dataAnimation < 9 && dataAnimation !== null ? dataAnimation + 1 : null;
		}
		elementsContainer.appendChild(hydratedListGroup);
	});
}

// Utils functions
function cloneNode(templateElement) {
	return document.importNode(templateElement.content, true);
}

function getListGroup() {
	return cloneNode(document.querySelector("template#listGroup"));
}

function hydrateListGroup(listGroupNode, Group) {
	listGroupNode.querySelector(".group").classList.add(Group.color);
	const nameContainer = listGroupNode.querySelector(".JS-group-list-item");
	nameContainer.innerText = Group.name;
	nameContainer.dataset.id = Group.id;
	return listGroupNode;
}

function getInputGroup() {
	return cloneNode(document.querySelector("template#inputGroup"));
}

function hydrateInputGroup(inputGroupNode, Input) {
	const inputs = inputGroupNode.querySelectorAll("input");
	inputs[0].value = Input.name;
	inputs[1].value = Input.domain;
	return inputGroupNode;
}