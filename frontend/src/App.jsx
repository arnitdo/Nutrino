import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NavBar from "./pages/NavBar.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import Hello from "./pages/Hello.jsx";
import Recipe from "./pages/Recipe.jsx";
import Homepage from "./pages/Homepage.jsx";
import Footer from "./pages/Footer.jsx";
import RecipeId from "./pages/RecipeId.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import ProductScanner from "./pages/ProductScanner.jsx";
import Community from "./pages/Community.jsx";

function App() {
    return (
        <div className={"w-screen min-h-screen flex flex-col"}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path={"/"} index element={<Homepage />} />
					<Route path={"/signup"} element={<SignupPage />} />
					<Route path={"/login"} element={<LoginPage />} />
					<Route path={"/onboarding"} element={<OnboardingPage />} />
					<Route path={"/me"} element={<Hello />} />
					<Route path={"/recipe"} element={<Recipe />} />
					<Route path={"/recipe/:id"} element={<RecipeId />} />
					<Route path={"/productscanner"} element={<ProductScanner />} />
					<Route path={"/community"} element={<Community />} />
				</Routes>
				<Footer/>
			</BrowserRouter>
		</div>
    )
}

export default App
