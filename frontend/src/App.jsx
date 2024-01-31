import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from "./components/SignupPage.jsx";
import LoginPage from "./components/LoginPage.jsx";

function App() {

    return (
        <BrowserRouter>
			<Routes>
				<Route path={"/signup"} element={<SignupPage />} />
				<Route path={"/login"} element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
    )
}

export default App
