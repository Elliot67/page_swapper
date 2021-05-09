export function updateModal(Group, withAnimation = true) {

	document.querySelector(".JS-modal-name-input").value = Group.name;

	const elementsContainer = document.querySelector(".JS-modal-input-container");
	clearChildrenNodes(elementsContainer);
	let dataAnimation = 4;
	Group.items.forEach((item) => {
		const hydratedInput = hydrateInputGroup(getInputGroup(), item);
		if (dataAnimation !== null && withAnimation) {
			const element = hydratedInput.querySelector("*");
			element.style = `anim-delay-pos: ${dataAnimation};`;
			element.dataset.anim = true;
			dataAnimation++;
		}
		elementsContainer.appendChild(hydratedInput);
	});
}

export function updateListGroup(groupList = [], withAnimation = true) {
	const elementsContainer = document.querySelector(".JS-group-list-container");
	clearChildrenNodes(elementsContainer);
	let dataAnimation = 4;
	groupList.forEach((group) => {
		const hydratedListGroup = hydrateListGroup(getListGroup(), group);
		if (dataAnimation !== null && withAnimation) {
			const element = hydratedListGroup.querySelector("*");
			element.style = `anim-delay-pos: ${dataAnimation};`;
			element.dataset.anim = true;
			dataAnimation++;
		}
		elementsContainer.appendChild(hydratedListGroup);
	});
}

export function updateHead(currentGroup, currentItem) {
	const placeholder = document.querySelector(".JS-head-placeholder");
	const headContainer = document.querySelector(".JS-head-container");
	clearChildrenNodes(headContainer);

	if (currentGroup === null) {
		headContainer.classList.add("hidden");
		placeholder.classList.remove("hidden");
		return;
	}

	currentGroup.items.forEach((item) => {
		const hydratedItem = hydrateHeadItem(getHeadTemplate(), item, currentItem.id === item.id);
		headContainer.appendChild(hydratedItem);
	});
	placeholder.classList.add("hidden");
	headContainer.classList.remove("hidden");
}

// Utils functions
function cloneNode(templateElement) {
	return document.importNode(templateElement.content, true);
}

function getListGroup() {
	return cloneNode(document.querySelector("template#listGroup"));
}

function getHeadTemplate() {
	return cloneNode(document.querySelector("template#headItem"));
}

function hydrateHeadItem(headTemplate, Item, isActive) {
	const itemElement = headTemplate.querySelector(".item");
	itemElement.innerText = Item.name;
	console.log(isActive);
	if (isActive) itemElement.classList.add("active");
	return itemElement;
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

function clearChildrenNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}