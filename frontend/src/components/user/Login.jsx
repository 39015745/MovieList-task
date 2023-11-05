import { useDispatch } from "react-redux";
import { useState } from "react";

import { authenticateUser } from "../../store/auth-actions";
import useInput from "../../hooks/useInput";
import classes from "./Login.module.css";

function Login() {
	const dispatch = useDispatch();

	const [error, setError] = useState(null);

	const {
		value: username,
		hasError: usernameHasError,
		valueIsvalid: usernameIsValid,
		inputHandler: usernameHandler,
		inputBlurHandler: usernameBlurHandler,
		reset: resetUsername,
	} = useInput((value) => value.trim() !== "");

	const {
		value: password,
		hasError: passwordHasError,
		valueIsvalid: passwordIsValid,
		inputHandler: passwordHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPassword,
	} = useInput((value) => value.trim() !== "");

	const usernameInputClasses = usernameHasError
		? `${classes.inputContainer} ${classes.invalid}`
		: classes.inputContainer;
	const passwordInputClasses = passwordHasError
		? `${classes.inputContainer} ${classes.invalid}`
		: classes.inputContainer;

	let formHasErrors = false;
	if (usernameIsValid && passwordIsValid) {
		formHasErrors = true;
	}

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		setError(null);
		const response = await dispatch(authenticateUser(username, password));
		if (response) {
			setError(response.message);
		}
	};

	return (
		<form className={classes.form} onSubmit={formSubmitHandler}>
			<div className={usernameInputClasses}>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" value={username} onChange={usernameHandler} onBlur={usernameBlurHandler} />
				<div className={[classes.error]}>{usernameHasError ? "*Please enter A Valid Username" : ""}</div>
			</div>
			<div className={passwordInputClasses}>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" value={password} onChange={passwordHandler} onBlur={passwordBlurHandler} />
				<div className={[classes.error]}>{passwordHasError ? "*Please enter A Valid Password" : ""}</div>
			</div>
			<div className={classes.error}>{error ? error : ""}</div>
			<button className={classes.submit} disabled={!formHasErrors}>
				Login
			</button>
		</form>
	);
}

export default Login;
