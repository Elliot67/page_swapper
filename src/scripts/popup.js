import * as service from "./service";
import * as pageService from "./pageService";

async function init() {
	const settings = await service.getSettings();
	const tab = await service.getTabInfo();

	console.log({ settings });
	console.log({ tab });
}

init();