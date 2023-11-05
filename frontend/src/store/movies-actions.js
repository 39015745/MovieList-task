import { movieActions } from "./movies-slice";

export const getMovies = () => {
	return async (dispatch) => {
		try {
			const response = await fetch("http://localhost:8080/api/MovieList", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"authorization": "Bearer " + localStorage.getItem("accessToken"),
				},
			});

			if (response.ok) {
				const data = await response.json();
				dispatch(movieActions.addMovies(data));
			} else {
				console.log("data");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};
};
