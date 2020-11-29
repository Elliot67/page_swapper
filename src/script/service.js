function redirectTo(newUrl) {
	chrome.tabs.update({ url: newUrl });
}

function getTabInfo() {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			resolve(tabs[0]);
		});
	});
}

function getSettings() {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(['settings'], function (settings) {
			resolve(settings);
		});
	});
}

function setSettings(newSettings) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.set({ settings: newSettings }, () => resolve());
	})
}