export function setCookie (key, value, expiredHours = 1) {
	const date = new Date();
	date.setTime(date.getTime() + expiredHours*60*60*1000);
	document.cookie = key + "=" + value + "; expires=" + date.toUTCString();
};

export function deleteCookie (key) {
	document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export function getCookie (key) {
	const cookies = document.cookie.split(", ");
	let cookieValue;
	cookies.forEach(cookie => {
		const keysAndValues = cookie.split("=");
		if (keysAndValues[0] === key) {
			cookieValue = keysAndValues[1];
		}
	})
	return cookieValue;
};