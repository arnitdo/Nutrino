import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NavBar from "./pages/NavBar.jsx";
import Hello from "./pages/Hello.jsx";

function App() {

    return (
        <div className={"w-screen min-h-screen flex flex-col"}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path={"/signup"} element={<SignupPage />} />
					<Route path={"/login"} element={<LoginPage />} />
					<Route path={"/me"} element={<Hello />} />
				</Routes>
			</BrowserRouter>
		</div>
    )
}

export default App
