import * as service from "./service";
export const groupColors = ["clr1", "clr2", "clr3", "clr4"];

export class Group {
	constructor() {
		this.id = null; // Not generating id to be able to differenciate between edit and new group
		this.name = "";
		this.color = groupColors[Math.floor(Math.random() * groupColors.length)];
		this.items = [];

		this.createItem({});
	}

	generateId() {
		this.id = service.generateUniqueId();
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

	hydrateWithObject(groupObject) {
		this.generateId();
		this.color = groupObject.color;
		this.name = groupObject.name;

		this.clearItems();
		groupObject.items.forEach((itemObject) => {
			this.createItem({
				name: itemObject.name,
				domain: itemObject.domain,
			});
		});
	}
}

export class Item {
	constructor({ name = "", domain = "" }) {
		this.name = name;
		this.domain = domain;
		this.generateId();
	}

	generateId() {
		this.id = service.generateUniqueId();
	}

	hydrateItemWithObject(itemObject) {
		this.name = itemObject.item;
		this.domain = itemObject.domain;
	}
}