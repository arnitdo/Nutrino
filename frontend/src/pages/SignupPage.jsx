import {useState} from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import {Link, useNavigate} from "react-router-dom";
import store from "../lib/zustand";
import OrangeBG from "../assets/orange_bg.jpeg";

export default function SignupPage() {
	const [name, setname] = useState("")
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const {setToast, setMessage, setAuth, setType, backend_url} = store()
	const navigate = useNavigate()
	const handleSignup = async (e) => {
		e.preventDefault()
		const url = backend_url
		console.log(url)
		try {
			const res = await fetch(`${url}/auth/signup`, {
				method: "POST",
				body: JSON.stringify({name, email, password}),
				headers: {
					"Content-Type": "application/json"
				}
			})
			const data = await res.json()
			if (data.error) {
				setMessage(data.error)
				setType("danger")
				setToast(true)
				return
			}
			const token = data.authToken
			localStorage.setItem("auth-token", token)
			setAuth(true)
			setMessage("Signup successful")
			setType("success")
			setToast(true)
			navigate("/me")

		} catch (error) {
			console.log(error)
			setType("danger")
			setMessage("Something went wrong")
			setToast(true)
		}
	}
	return (
		<div style={{backgroundImage: `url(${OrangeBG})`}}
			 className={"w-screen min-h-screen flex-grow flex justify-center items-center"}>
			<Card heading={"SIGN UP"}>
				<form onSubmit={(e) => handleSignup(e)}>
					<div className={"flex flex-col gap-2"}>
						<p className="font-bold mt-2">Name :</p>
						<Input value={name} setValue={setname} placeholder={"Enter Name : "} type={"text"}/>
						<p className="font-bold mt-2">Email :</p>
						<Input value={email} setValue={setemail} placeholder={"Enter Email : "} type={"email"}/>
						<p className="font-bold mt-2">Password :</p>
						<Input value={password} setValue={setpassword} placeholder={"Enter Password : "}
							   type={"password"}/>
						<div className="mt-4 justify-center flex">
							<Button type={"submit"}>
								Sign Up
							</Button>
						</div>
						<p className="font-bold mt-2">Already have an account?
							<Link to={"/login"} className="pl-2 font-extrabold text-green-800 underline">Login
								Here</Link></p>
					</div>
				</form>
			</Card>
		</div>
	)
}