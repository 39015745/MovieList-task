import classes from "./MainHeader.module.css";

import { authActions } from "../store/auth-slice";

import { useSelector, useDispatch } from "react-redux";

function MainHeader(props) {
	const dispatch = useDispatch();

	const userChoice = useSelector((state) => state.authentication.userAction);
	const token = useSelector((state) => state.authentication.token);
	const username = localStorage.getItem("username");

	const navigate = (page) => {
		if (page === "movies") {
			dispatch(authActions.authChoice("movies"));
		}
		if (page === "register") {
			dispatch(authActions.authChoice("register"));
		}
		if (page === "login") {
			dispatch(authActions.authChoice("login"));
		}
	};

	const logout = () => {
		dispatch(authActions.logout());
	};

	const moviePage =
		userChoice === "movies" ? `${classes.button} ${classes.selected}` : `${classes.button} ${classes.hover}`;
	const registerPage =
		userChoice === "register" ? `${classes.button} ${classes.selected}` : `${classes.button} ${classes.hover}`;
	const loginPage =
		userChoice === "login" ? `${classes.button} ${classes.selected}` : `${classes.button} ${classes.hover}`;

	return token === null ? (
		<div className={classes.container}>
			<button onClick={() => navigate("movies")} className={moviePage}>
				Movies
			</button>

			<button onClick={() => navigate("register")} className={registerPage}>
				Register
			</button>

			<button onClick={() => navigate("login")} className={loginPage}>
				Login
			</button>
		</div>
	) : (
		<div className={classes.container}>
			<h1 className={classes.h1}>Hello, {username}</h1>
			<button onClick={logout} className={classes.button}>
				Logout
			</button>
		</div>
	);
}

export default MainHeader;
