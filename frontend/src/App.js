import Layout from "./components/Layout";
import MainPage from "../src/components/list/MainPage";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import { checkTokenDuration } from "./util/util";

import { useSelector } from "react-redux";
checkTokenDuration();

function App() {
	const userChoice = useSelector((state) => state.authentication.userAction);

	return (
		<Layout>
			{userChoice === "movies" && <MainPage />}
			{userChoice === "register" && <Register />}
			{userChoice === "login" && <Login />}
		</Layout>
	);
}

export default App;
