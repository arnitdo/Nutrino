import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Hello from "./pages/Hello.jsx";

function App() {

    return (
        <BrowserRouter>
			<Routes>
				<Route path={"/signup"} element={<SignupPage />} />
				<Route path={"/login"} element={<LoginPage />} />
				<Route path={"/me"} element={<Hello />} />
			</Routes>
		</BrowserRouter>
    )
}

export default App
