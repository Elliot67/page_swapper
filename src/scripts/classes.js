const groupColors = ["yellow", "green", "orange"]; // TODO: A changer

export class Group {
	constructor() {
		this.id = generateUniqueId();
		this.name = "";
		this.color = groupColors[Math.floor(Math.random() * groupColors.length)];
		this.items = [];

		this.createItem();
	}

	createItem() {
		this.items.push(new Item());
	}
}

export class Item {
	constructor() {
		this.id = generateUniqueId();
		this.name = "";
		this.domain = "";
	}
}

function generateUniqueId() {
	return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}
