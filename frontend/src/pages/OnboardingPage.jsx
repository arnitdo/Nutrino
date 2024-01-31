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
	const [userProfile, setUserProfile] = useState({
		prefers: [],
		avoids: [],
		allergies: [],
		height: 0,
		weight: 0,
		age: 0
	})

	const firstInput = useRef(null)

	return (
		<div
			style={{backgroundImage: `url(${OrangeBG})`, backgroundRepeat: "repeat-y"}}
			className={"py-[10vh] min-h-screen w-screen flex-grow flex flex-col justify-around items-center gap-8 bg-lgreen"}
		>
			<div className={"w-[80vw]"}>
				<Paper>
					<div className={"bg-lgreen flex flex-col lg:flex-row justify-between items-center p-8 text-bold"}>
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
									<Paper key={presetName} flex>
										<div
											className={"cursor-pointer flex justify-around items-center flex-col flex-grow gap-4 p-8 bg-lgreen"}
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
							className={"cursor-pointer col-span-2 rounded-md border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-lgreen text-2xl flex flex-col justify-center items-center"}
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
			<form className={"w-[80vw] flex flex-grow flex-col gap-8"}>
				<Paper>
					<div className={"flex-grow flex flex-col gap-4 bg-lgreen p-4"}>
						<div className={"font-bold text-2xl"} ref={firstInput}>I prefer :</div>
						<Input grow placeholder={"Enter ingredients you prefer"}/>
					</div>
				</Paper>
				<Paper>
					<div className={"flex-grow flex flex-col gap-4 bg-lorange p-4"}>
						<div className={"font-bold text-2xl"}>I am allergic to :</div>
						<Input grow placeholder={"Enter ingredients you are allergic to"}/>
					</div>
				</Paper>
				<Paper>
					<div className={"flex-grow flex flex-col gap-4 bg-lgreen p-4"}>
						<div className={"font-bold text-2xl"}>I avoid :</div>
						<Input grow placeholder={"Enter ingredients you avoid"}/>
					</div>
				</Paper>
				<Paper>
					<div className={"flex flex-row flex-grow"}>
						<div className={"flex-grow flex flex-col gap-4 bg-lorange p-4"}>
							<div className={"font-bold text-2xl"}>Height :</div>
							<Input grow placeholder={"Height (in cm)"}/>
						</div>
						<div className={"flex-grow flex flex-col gap-4 bg-lorange p-4"}>
							<div className={"font-bold text-2xl"}>Weight :</div>
							<Input grow placeholder={"Weight (in kg)"}/>
						</div>
						<div className={"flex-grow flex flex-col gap-4 bg-lorange p-4"}>
							<div className={"font-bold text-2xl"}>Age :</div>
							<Input grow placeholder={"Age (in years)"}/>
						</div>
					</div>
				</Paper>
				<Button type={"submit"}>Save Preferences</Button>
			</form>
		</div>
	)
}

export default OnboardingPage;