import { useEffect, useState } from "react";

import classes from "./MovieList.module.css";

function MovieList({ movieList }) {
	const [searchValue, setSearchValue] = useState("");
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesCount, setPagesCount] = useState(0);
	const [sortBy, setSortBy] = useState("");

	useEffect(() => {
		let filtered = movieList;
		if (searchValue) {
			filtered = filtered.filter((movie) => movie.title.toLowerCase().includes(searchValue.toLowerCase()));
		}

		if (sortBy === "title") {
			filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
		} else if (sortBy === "rating") {
			filtered = [...filtered].sort((a, b) => b.rating - a.rating);
		}

		const newPagesCount = Math.ceil(filtered.length / 5);
		setPagesCount(newPagesCount);

		const slice = currentPage * 5;
		const slicedList = filtered.slice(slice - 5, slice);
		setFilteredMovies(slicedList);
	}, [searchValue, movieList, currentPage, sortBy]);

	let pageNumbers = [];
	for (let i = 1; i <= pagesCount; i++) {
		pageNumbers.push(i);
	}

	const findMovie = (e) => {
		const searchInput = e.target.value;
		setSearchValue(searchInput);
		setCurrentPage(1);
	};

	const sortList = (e) => {
		const sortByValue = e.target.value;
		setSortBy(sortByValue);
	};

	return (
		<div className={classes.listLayout}>
			<form className={classes.searchForm}>
				<input
					type="text"
					id="search"
					placeholder="Search..."
					value={searchValue}
					onChange={findMovie}
					autocomplete="off"
				/>
				<select id="cars" name="cars" defaultValue="" onChange={sortList}>
					<option value="" disabled>
						Sort By
					</option>
					<option value="title">Title</option>
					<option value="rating">Rating</option>
				</select>
			</form>
			<div className={classes.myClass}>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Description</th>
							<th>Rating</th>
						</tr>
					</thead>
					<tbody>
						{filteredMovies.map((movie) => (
							<tr key={movie.id}>
								<td className={classes.title}>{movie.title}</td>
								<td className={classes.description}>{movie.description}</td>
								<td className={classes.rating}>{movie.rating}/10</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={classes.pagination}>
				{pageNumbers.map((pageNumber) => (
					<span key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
						{pageNumber}
					</span>
				))}
			</div>
		</div>
	);
}

export default MovieList;
