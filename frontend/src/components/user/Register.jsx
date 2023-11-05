import { useDispatch } from "react-redux";
import { useState } from "react";

import { registerUser } from "../../store/auth-actions";
import useInput from "../../hooks/useInput";
import classes from "./Register.module.css";

function Register() {
	const dispatch = useDispatch();

	const pattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	const [error, setError] = useState(null);

	const {
		value: username,
		hasError: usernameHasError,
		valueIsvalid: usernameIsValid,
		inputHandler: usernameHandler,
		inputBlurHandler: usernameBlurHandler,
		reset: resetUsername,
	} = useInput((value) => value.trim() !== "" && !pattern.test(value));

	const {
		value: password,
		hasError: passwordHasError,
		valueIsvalid: passwordIsValid,
		inputHandler: passwordHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPassword,
	} = useInput((value) => value.trim() !== "" && value.trim().length > 5);

	const {
		value: email,
		hasError: emailHasError,
		valueIsvalid: emailIsValid,
		inputHandler: emailHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput((value) => value.trim() !== "" && emailPattern.test(value));

	const usernameInputClasses = usernameHasError
		? `${classes.inputContainer} ${classes.invalid}`
		: classes.inputContainer;
	const passwordInputClasses = passwordHasError
		? `${classes.inputContainer} ${classes.invalid}`
		: classes.inputContainer;
	const emailInputClasses = emailHasError ? `${classes.inputContainer} ${classes.invalid}` : classes.inputContainer;

	let formHasErrors = false;
	if (usernameIsValid && passwordIsValid && emailIsValid) {
		formHasErrors = true;
	}

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		setError(null);
		const response = await dispatch(registerUser(username, password, email));
		if (response) {
			setError(response.message);
		}
	};

	return (
		<form className={classes.form} onSubmit={formSubmitHandler}>
			<div className={usernameInputClasses}>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" value={username} onChange={usernameHandler} onBlur={usernameBlurHandler} />
				<div className={[classes.error]}>{usernameHasError ? "*Please enter a valid username" : ""}</div>
			</div>
			<div className={passwordInputClasses}>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" value={password} onChange={passwordHandler} onBlur={passwordBlurHandler} />
				<div className={[classes.error]}>{passwordHasError ? "*Password must be atleast 6 characters long" : ""}</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" value={email} onChange={emailHandler} onBlur={emailBlurHandler} />
				<div className={classes.error}>{emailHasError ? "*Please enter a valid email" : ""}</div>
			</div>
			<div className={classes.error}>{error ? error : ""}</div>
			<button className={classes.submit} disabled={!formHasErrors}>
				Register
			</button>
		</form>
	);
}

export default Register;
