import OrangeBG from "../assets/orange_bg.jpeg";
import Paper from "../components/Paper.jsx";
import {useRef, useState} from "react";

import JainIcon from "../assets/jain.png"
import HalalIcon from "../assets/halal.png"
import VeganIcon from "../assets/vegan.png"
import KosherIcon from "../assets/kosher.png"
import VegIcon from "../assets/veg.png"
import NonVegIcon from "../assets/nonveg.png"
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import store from "../lib/zustand.js";
import {useNavigate} from "react-router-dom";

const ONBOARDING_PRESETS = {
	"Jain": {
		icon: JainIcon,
		prefers: ["Banana", "Fruits", "Dry fruits"],
		avoids: ["Onions", "Potatoes", "Carrots", "Garlic", "Ginger", "Radish", "Eggs", "Meat", "Fish"],
	},
	"Vegan": {
		icon: VeganIcon,
		prefers: ["Fruits", "Vegetables"],
		avoids: ["Meat", "Fish", "Eggs", "Dairy"]
	},
	"Halal": {
		icon: HalalIcon,
		prefers: ["Beef", "Chicken"],
		avoids: ["Pork"]
	},
	"Kosher": {
		icon: KosherIcon,
		prefers: ["Beef", "Chicken"],
		avoids: ["Pork", "Cheese", "Fish"]
	},
	"Veg": {
		icon: VegIcon,
		prefers: ["Fruits", "Vegetables", "Breads", "Dairy"],
		avoids: ["Eggs", "Fish", "Meat", "Poultry"]
	},
	"Non-Veg": {
		icon: NonVegIcon,
		prefers: ["Fruits", "Vegetables", "Breads", "Dairy", "Eggs", "Fish", "Meat", "Poultry"],
		avoids: []
	}
};

function OnboardingPage() {
	const {backend_url, setAuth, setMessage, setType, setToast, setUser} = store()

	const navigate = useNavigate()

	const [userProfile, setUserProfile] = useState({
		prefers: [],
		avoids: [],
		allergies: [],
		height: 0,
		weight: 0,
		age: 0
	})

	const firstInput = useRef(null)

	const handleOnboard = async (e) => {
		e.preventDefault()
		const url = backend_url

		const authToken = localStorage.getItem("auth-token")
		if (!authToken) {
			return
		}

		try {
			const res = await fetch(`${url}/auth/onboard`, {
				method: "PUT",
				body: JSON.stringify(userProfile),
				headers: {
					"Content-Type": "application/json",
					"auth-token": authToken
				}
			})
			const data = await res.json()
			if (data.error) {
				setMessage(data.error)
				setType("danger")
				setToast(true)
				return
			}
			setUser(data.user)
			setMessage("Preferences Updated!")
			setType("success")
			setToast(true)
			navigate("/me")
		} catch (error) {
			setMessage("Something went wrong!")
			setType("danger")
			setToast(true)
		}
	}

	return (
		<div
			style={{backgroundImage: `url(${OrangeBG})`, backgroundRepeat: "repeat-y"}}
			className={"py-[10vh] min-h-screen w-screen flex-grow flex flex-col justify-around items-center gap-8 bg-lgreen"}
		>
			<div className={"w-[80vw]"}>
				<Paper>
					<div className={"bg-lavender flex flex-col lg:flex-row justify-between items-center p-8 text-bold"}>
						<div className={"text-4xl"}>
							Let&apos;s Get Started
						</div>
						<div className={"text-lg"}>
							Fill in your dietary preferences, or select one of the presets below!
						</div>
					</div>
				</Paper>
			</div>
			<div className={"w-[80vw] grid gap-8 flex-grow grid-cols-2 lg:grid-cols-4"}>
				{
					<>
						{
							Object.keys((ONBOARDING_PRESETS)).map((presetName) => {
								return (
									<Paper noBorder key={presetName} flex>
										<div
											className={"cursor-pointer flex justify-around items-center flex-col flex-grow gap-4 p-8 bg-lgreen transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"}
											onClick={() => {
												setUserProfile((prevProfile) => {
													const {prefers, avoids} = ONBOARDING_PRESETS[presetName]
													if (firstInput.current) {
														window.scrollTo({
															top: firstInput.current.offsetTop,
															behavior: "smooth",
															left: 0
														})
													}
													return {
														...prevProfile,
														prefers: prefers,
														avoids: avoids
													}
												})
											}}
										>
											<img
												src={ONBOARDING_PRESETS[presetName].icon}
												className={"w-[64px] h-[64px]"}
												alt={presetName}
											/>
											{presetName}
										</div>
									</Paper>
								)
							})
						}
						<div
							className={"cursor-pointer col-span-2 rounded-md font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-lgreen text-2xl flex flex-col justify-center items-center transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"}
							onClick={() => {
								if (firstInput.current) {
									window.scrollTo({
										top: firstInput.current.offsetTop,
										behavior: "smooth",
										left: 0
									})
								}
							}}
						>
							I&apos;ll pick my own preferences
						</div>
					</>
				}
			</div>
			<form className={"w-[80vw] flex flex-grow flex-col gap-8"} onSubmit={handleOnboard}>
				<Paper>
					<div className={"flex-grow flex flex-col gap-4 bg-lgreen p-4"}>
						<div className={"font-bold text-2xl"} ref={firstInput}>I prefer :</div>
						<Input
							grow
							placeholder={"Enter ingredients you prefer"}
							value={userProfile.prefers.reduce((prevFood, curFood, idx, arr) => {
								if (idx === 0) {
									return `${curFood}`
								}
								return `${prevFood}, ${curFood}`
							}, "")}
							setValue={(newVal) => {
								setUserProfile((prevProfile) => {
									return {
										...prevProfile,
										prefers: newVal.split(",").map((allPref) => allPref.trim())
									}
								})
							}}
						/>
					</div>
				</Paper>
				<Paper>
					<div className={"flex-grow flex flex-col gap-4 bg-lorange p-4"}>
						<div className={"font-bold text-2xl"}>I am allergic to :</div>
						<Input
							grow placeholder={"Enter ingredients you are allergic to"}
							value={userProfile.allergies.reduce((prevFood, curFood, idx, arr) => {
								if (idx === 0) {
									return `${curFood}`
								}
								return `${prevFood}, ${curFood}`
							}, "")}
							setValue={(newVal) => {
								setUserProfile((prevProfile) => {
									return {
										...prevProfile,
										allergies: newVal.split(",").map((allPref) => allPref.trim())
									}
								})
							}}
						/>
					</div>
				</Paper>
				<Paper>
					<div className={"flex-grow flex flex-col gap-4 bg-lgreen p-4"}>
						<div className={"font-bold text-2xl"}>I avoid :</div>
						<Input
							grow
							placeholder={"Enter ingredients you avoid"}
							value={userProfile.avoids.reduce((prevFood, curFood, idx, arr) => {
								if (idx === 0) {
									return `${curFood}`
								}
								return `${prevFood}, ${curFood}`
							}, "")}
							setValue={(newVal) => {
								setUserProfile((prevProfile) => {
									return {
										...prevProfile,
										avoids: newVal.split(",").map((allPref) => allPref.trim())
									}
								})
							}}
						/>
					</div>
				</Paper>
				<Paper>
					<div className={"flex flex-row flex-grow"}>
						<div className={"flex-grow flex flex-col gap-4 bg-lorange p-4"}>
							<div className={"font-bold text-2xl"}>Height :</div>
							<Input
								grow
								placeholder={"Height (in cm)"}
								value={userProfile.height}
								setValue={(newVal) => setUserProfile((prevProfile) => {
									return {
										...prevProfile,
										height: newVal
									}
								})}
							/>
						</div>
						<div className={"flex-grow flex flex-col gap-4 bg-lorange p-4"}>
							<div className={"font-bold text-2xl"}>Weight :</div>
							<Input
								grow
								placeholder={"Weight (in kg)"}
								value={userProfile.weight}
								setValue={(newVal) => setUserProfile((prevProfile) => {
									return {
										...prevProfile,
										weight: newVal
									}
								})}
							/>
						</div>
						<div className={"flex-grow flex flex-col gap-4 bg-lorange p-4"}>
							<div className={"font-bold text-2xl"}>Age :</div>
							<Input
								grow
								placeholder={"Age (in years)"}
								value={userProfile.age}
								setValue={(newVal) => setUserProfile((prevProfile) => {
									return {
										...prevProfile,
										age: newVal
									}
								})}
							/>
						</div>
					</div>
				</Paper>
				<Button color="lavender" type={"submit"}>Save Preferences</Button>
			</form>
		</div>
	)
}

export default OnboardingPage;