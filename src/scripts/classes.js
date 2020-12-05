export const groupColors = ["clr1", "clr2", "clr3"]; // TODO: A changer

export class Group {
	constructor() {
		this.id = null;
		this.name = "";
		this.color = groupColors[Math.floor(Math.random() * groupColors.length)];
		this.items = [];

		this.createItem({});
	}

	generateId() {
		this.id = generateUniqueId();
	}

	createItem(params = {}) {
		this.items.push(new Item(params));
	}

	clearItems() {
		this.items = [];
	}

	hydrateWithForm(isLastSave = false) {
		const form = document.querySelector(".JS-modal-form");
		this.name = form.querySelector(".JS-modal-name-input").value;
		const allItems = form.querySelectorAll(".JS-modal-group-item");

		this.clearItems();
		for (const item of allItems) {
			const inputs = item.querySelectorAll("input");
			if (isLastSave && inputs[0].value === "" && inputs[1].value === "") continue;
			this.createItem({
				name: inputs[0].value,
				domain: inputs[1].value,
			});
		}

		if (this.items.length === 0) {
			this.createItem();
		}
	}
}

export class Item {
	constructor({ name = "", domain = "" }) {
		this.name = name;
		this.domain = domain;
	}
}

function generateUniqueId() {
	return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}
