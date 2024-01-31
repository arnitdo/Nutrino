import React, { useEffect } from 'react'
import store from '../lib/zustand'
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import purplebg from "../assets/purplebg.png"
export default function Hello() {
	const { user, Logout, setMessage, setType, setToast } = store()

	const navigate = useNavigate()

	useEffect(() => {
		if (user === null) {
			navigate("/login")
		}
	}, [user])

	if (user === null) {
		return null;
	}

	return (
		<>
			<div
				style={{ backgroundImage: `url(${purplebg})` }}
				className={"w-screen h-screen flex-grow flex justify-center items-center"}
			>
				<Card heading={"MY PROFILE"} headingColor={"bg-dgreen"}>
					<form>
						<div className={"flex flex-col gap-8"}>
							<div className='flex flex-row gap-8 p-8 '>
								<div className={"flex flex-col gap-4"}>
									<p className="font-bold mt-2">Name :</p>
									<Input value={user.name}
										type={"text"}
									/>
									<p className="font-bold mt-2">Email :</p>
									<Input value={user.email}
										type={"email"} />
									<p className="font-bold mt-2">Allergies :</p>
									<Input value={user.allergies}
										type={"text"}
									/>
									<p className="font-bold mt-2">Allergies :</p>
									<Input value={user.allergies}
										type={"text"}
									/>
								</div>
								<div className={"flex flex-col gap-4"}>

									<p className="font-bold mt-2">Prefers :</p>
									<Input value={user.prefers}
										type={"text"}
									/>
									<p className="font-bold mt-2">Age :</p>
									<Input value={user.age}
										type={"text"}
									/>
									<p className="font-bold mt-2">Weight :</p>
									<Input value={user.weight}
										type={"text"}
									/>
									<p className="font-bold mt-2">Height :</p>
									<Input value={user.height}
										type={"text"}
									/>
								</div>
							</div>
							<div className="flex-grow flex justify-center flex">
								<button className='bg-red-500 border-2 rounded-md border-black p-2 hover:scale-95 shadow-4 4 0 0 rgba(0,0,0,1) transition-all hover:translate-x-3 hover:translate-y-3 hover:shadow-none' onClick={() => {
									Logout();
									localStorage.setItem("auth-token", null)
									setMessage("Logged Out");
									setToast(true)
									setType("info")
								}}>
									Logout User
								</button>
							</div>
						</div>
					</form>
				</Card>
			</div>
		</>

	)
}
