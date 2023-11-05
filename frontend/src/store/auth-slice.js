import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "authentication",
	initialState: { userAction: "movies", token: localStorage.getItem("accessToken"), username: null },
	reducers: {
		login(state) {
			state.username = localStorage.getItem("username");
			state.token = localStorage.getItem("accessToken");
			state.userAction = "movies";
		},
		register(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
		logout(state) {
			state.token = null;
			localStorage.removeItem("accessToken");
			localStorage.removeItem("expiration");
		},
		authChoice(state, action) {
			state.userAction = action.payload;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
