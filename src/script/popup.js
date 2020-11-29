async function init() {
	const settings = await getSettings();
	const tab = await getTabInfo();

	console.log({ settings });
	console.log({ tab });
}

init();