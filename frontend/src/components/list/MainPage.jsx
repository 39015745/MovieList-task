import { useSelector, useDispatch } from "react-redux";

import { getMovies } from "../../store/movies-actions";
import classes from "./MainPage.module.css";
import { useEffect } from "react";
import MovieList from "./MovieList";

function MainPage() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authentication.token);
	let movieList = useSelector((state) => state.moviesList.movies);

	useEffect(() => {
		if (token) {
			dispatch(getMovies());
		}
	}, []);

	return (
		<div className={classes.container}>
			<h1 className={classes.h1color}>Favorite Movie List</h1>
			{token ? (
				<MovieList movieList={movieList} />
			) : (
				<h1 className={classes.h1Padding}>&lt;Register Or Login To View The List&gt;</h1>
			)}
		</div>
	);
}

export default MainPage;
