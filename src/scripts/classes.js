const groupColors = ["clr1", "clr2", "clr3"]; // TODO: A changer

export class Group {
	constructor() {
		this.id = generateUniqueId();
		this.name = "";
		this.color = groupColors[Math.floor(Math.random() * groupColors.length)];
		this.items = [];

		this.createItem({});
	}

	createItem(params = {}) {
		this.items.push(new Item(params));
	}

	clearItems() {
		this.items = [];
	}


	hydrateWithForm() {
		const form = document.querySelector(".JS-modal-form");
		this.name = form.querySelector(".JS-modal-name-input").value;
		const allItems = form.querySelectorAll(".JS-modal-group-item");

		this.clearItems();
		allItems.forEach((item) => {
			const inputs = item.querySelectorAll("input");
			this.createItem({
				name: inputs[0].value,
				domain: inputs[1].value,
			});
		});
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
