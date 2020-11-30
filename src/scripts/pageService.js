export function getListGroup() {
	return cloneNode(document.querySelector("template#listGroup"));
}

export function getInputGroup() {
	return cloneNode(document.querySelector("template#listGroup"));
}


// Private functions
function cloneNode(node) {
	return document.importNode(node.content, true);
}