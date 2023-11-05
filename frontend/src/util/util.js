export function checkTokenDuration() {
	const storedExpirationDate = localStorage.getItem("expiration");
	const expirationDate = new Date(storedExpirationDate);
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();
	if (duration < 0) {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("expiration");
	}
}
