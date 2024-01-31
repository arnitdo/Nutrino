import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NavBar from "./pages/NavBar.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import Hello from "./pages/Hello.jsx";
import Recipe from "./pages/Recipe.jsx";

function App() {
    return (
        <div className={"w-screen min-h-screen flex flex-col"}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path={"/signup"} element={<SignupPage />} />
					<Route path={"/login"} element={<LoginPage />} />
					<Route path={"/onboarding"} element={<OnboardingPage />} />
					<Route path={"/me"} element={<Hello />} />
					<Route path={"/recipe"} element={<Recipe />} />
				
			</Routes>
			</BrowserRouter>
		</div>
    )
}

export default App
