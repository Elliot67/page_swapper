export function redirectTo(newUrl) {
	chrome.tabs.update({ url: newUrl });
}

export function getTabInfo() {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			resolve(tabs[0]);
		});
	});
}

export function getGroupsFromSettings() {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get('groups-v1', (settings) => {
			const groups = settings && settings['groups-v1']?.length > 0 ? settings['groups-v1'] : [];
			resolve(groups);
		});
	});
}

export async function setGroupsToSettings(newGroups) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.set({ 'groups-v1': newGroups }, () => resolve());
	});
}

export function clearSettings() {
	return new Promise((resolve, reject) => {
		chrome.storage.local.clear(() => resolve());
	});
}

export function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}