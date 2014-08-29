function getBrowser() {
	if (/Google Inc./.test(navigator.vendor)) {
		return 'Google Chrome';
	} else if (/Opera Software ASA/.test(navigator.vendor) || /Opera/.test(navigator.appName)) {
		return 'Opera';
	} else if (/Microsoft Internet Explorer/.test(navigator.appName)) {
		return 'Microsoft Internet Explorer';
	} else if (/Firefox/.test(navigator.userAgent) && !/PaleMoon/.test(navigator.userAgent) && !/SeaMonkey/.test(navigator.userAgent)) {
		return 'Mozilla Firefox';
	} else if (/K-Meleon/.test(navigator.vendor)) {
		return 'K-Meleon';
	} else if (/Maxthon Asia Ltd./.test(navigator.vendor)) {
		return 'Maxthon';
	} else if (/PaleMoon/.test(navigator.userAgent)) {
		return 'Pale Moon';
	} else if (/SeaMonkey/.test(navigator.userAgent)) {
		return 'SeaMonkey';
	} else if (/Arora/.test(navigator.userAgent)) {
		return 'Arora';
	} else if (/Safari/.test(navigator.userAgent) && !/Opera Software ASA/.test(navigator.vendor)) {
		return 'Safari';
	} else {
		return 'an unknown browser';
	}
}

document.getElementById('browser').innerHTML = getBrowser();
