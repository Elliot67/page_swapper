export function updateModal(Group) {
	// TODO: Manage destroying and creating events
	document.querySelector(".JS-modal-bar").style.backgroundColor = Group.color;
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
	for (let group in groupList) {
		elementsContainer.appendChild(hydrateListGroup(getListGroup(), group));
	}
}

// Utils functions
function cloneNode(templateElement) {
	return document.importNode(templateElement.content, true);
}

function getListGroup() {
	return cloneNode(document.querySelector("template#listGroup"));
}

function hydrateListGroup(listGroupNode, Group) {
	console.log(listGroupNode);
	listGroupNode.children[0].innerText = Group.name;
	listGroupNode.dataset = Group.id;
	return listGroupNode;
}

function getInputGroup() {
	return cloneNode(document.querySelector("template#inputGroup"));
}

function hydrateInputGroup(inputGroupNode, Input) {
	inputGroupNode.querySelectorAll("input")[0].value = Input.name;
	inputGroupNode.querySelectorAll("input")[1].value = Input.domain;
	return inputGroupNode;
}