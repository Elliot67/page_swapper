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

export function getSettings() {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(['settings'], function (settings) {
			resolve(settings);
		});
	});
}

export function setSettings(newSettings) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.set({ settings: newSettings }, () => resolve());
	})
}