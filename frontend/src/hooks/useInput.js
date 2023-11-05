import { useReducer } from "react";

const initialInputState = {
	value: "",
	isTouched: false,
};

const inputStateReducer = (state, action) => {
	if (action.type === "INPUT") {
		return { value: action.value, isTouched: state.isTouched };
	}
	if (action.type === "BLUR") {
		return { isTouched: true, value: state.value };
	}
	if (action.type === "RESET") {
		return { isTouched: false, value: "" };
	}
	return inputStateReducer;
};

const useInput = (isValidChecker) => {
	const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

	const valueIsvalid = isValidChecker(inputState.value);
	const hasError = !valueIsvalid && inputState.isTouched;

	const inputHandler = (event) => {
		dispatch({ type: "INPUT", value: event.target.value });
	};

	const inputBlurHandler = () => {
		dispatch({ type: "BLUR" });
	};

	const reset = () => {
		dispatch({ type: "RESET" });
	};

	return { value: inputState.value, valueIsvalid, hasError, inputHandler, inputBlurHandler, reset };
};

export default useInput;
