import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import moviesSlice from "./movies-slice";

const store = configureStore({
	reducer: { authentication: authSlice.reducer, moviesList: moviesSlice.reducer },
});

export default store;
