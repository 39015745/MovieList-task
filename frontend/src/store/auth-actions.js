import { authActions } from "./auth-slice";

export const authenticateUser = (username, password) => {
	const requestBody = {
		username: username,
		password: password,
	};

	return async (dispatch) => {
		try {
			const response = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});
			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("accessToken", data.access_token);
				localStorage.setItem("username", username);
				const expiration = new Date();
				expiration.setHours(expiration.getHours() + 1);
				localStorage.setItem("expiration", expiration.toISOString());
				dispatch(authActions.login());
			} else {
				return data;
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};
};

export const registerUser = (username, password, email) => {
	const requestBody = {
		username: username,
		password: password,
		email: email,
	};

	return async (dispatch) => {
		try {
			const response = await fetch("http://localhost:8080/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});
			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("accessToken", data.access_token);
				localStorage.setItem("username", username);
				const expiration = new Date();
				expiration.setHours(expiration.getHours() + 1);
				localStorage.setItem("expiration", expiration.toISOString());
				dispatch(authActions.login());
			} else {
				return data;
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};
};
