import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

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
