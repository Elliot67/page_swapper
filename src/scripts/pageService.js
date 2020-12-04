export function updateModal(Group) {
	// TODO: Manage destroying and creating events
	document.querySelector(".JS-modal-bar").classList.add(Group.color);
	document.querySelector(".JS-modal-name-input").value = Group.name;

	const elementsContainer = document.querySelector(".JS-modal-input-container");
	elementsContainer.innerHTML = "";
	for (let item of Group.items) {
		const hydratedInput = hydrateInputGroup(getInputGroup(), item);
		elementsContainer.appendChild(hydratedInput);
	}
}

export function updateListGroup(groupList = []) {
	// TODO: Manage destroying and creating events
	const elementsContainer = document.querySelector(".JS-group-list-container");
	elementsContainer.innerHTML = "";
	groupList.forEach((group) => {
		const hydratedListGroup = hydrateListGroup(getListGroup(), group);
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