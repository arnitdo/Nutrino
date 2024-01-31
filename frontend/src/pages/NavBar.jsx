import NutrinoLogo from "../assets/nutrino-logo.png"
import {Link, useLocation} from "react-router-dom";
import Button from "../components/Button.jsx";

function NavBar(){
	const {pathname} = useLocation()

	return (
		<div className={"w-screen"}>
			<div className={`border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
				<div className={"bg-white flex flex-row justify-between"}>
					<Link to={"/"}>
						<img
							src={NutrinoLogo} alt={"Nutrino Logo"}
							className={"border-r-4 border-r-black h-[80px] hidden lg:block"}
						/>
					</Link>
					<nav className={"gap-4 px-4 flex flex-row flex-grow justify-between items-center font-bold"}>
						<div className={"px-4 lg:px-8 py-4 flex lg:gap-16 gap-4 flex-row justify-between"}>
							<Link to={"/"}>HOME</Link>
							<Link to={"/onboarding"}>START</Link>
							<Link to={""}>PAGE&nbsp;2</Link>
							<Link to={""}>PAGE&nbsp;3</Link>
						</div>
						<Link to={pathname === "/login" ? "/signup" : "/login"} className={"text-green-600 block lg:hidden"}>
							{pathname === "/login" ? "SIGN UP" : "LOG IN"}
						</Link>
						<div className={"flex-row gap-4 hidden lg:flex"}>
							<Link to={"/login"}>
								<Button color={"empty"}>LOG IN</Button>
							</Link>
							<Link to={"/signup"}>
								<Button color={"primary"}>SIGN UP</Button>
							</Link>
						</div>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default NavBar