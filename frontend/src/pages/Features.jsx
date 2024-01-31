import features_img from '../assets/features_img.png';

export default function Features() {
	return (
		<>
			<div className='flex flex-row bg-black w-screen'>
				<img src={features_img} className='h-screen justify-end'/>
				<div className='font-bold flex flex-col flex-grow justify-center gap-16 px-32 text-4xl'>
					<div className={"flex flex-col gap-4 2xl:gap-8"}>
						<p className='text-dgreen'>Scan Ingredients</p>
						<p className='text-white text-lg 2xl:text-2xl'><span className={"text-red-600"}>*</span>Take a
							quick snap of your food, we break down the ingredients for you. Simple as that!</p>
					</div>
					<div className={"flex flex-col gap-4 2xl:gap-8"}>
						<p className='text-dgreen'>Get Alerts</p>
						<p className='text-white text-lg 2xl:text-2xl'><span className={"text-red-600"}>*</span>Get
							near-instant alerts for any allergens present in your food!</p>
					</div>
					<div className={"flex flex-col gap-4 2xl:gap-8"}>
						<p className='text-dgreen'>Explore Alternatives</p>
						<p className='text-white text-lg 2xl:text-2xl'>Take a look at some of our allergy-friendly
							alternatives, customised to your preferences!</p>
					</div>
					<p className={"text-sm text-gray-400"}><span className={"text-red-600"}>*</span>Accuracy may vary,
						we recommend consulting medical professionals</p>
				</div>
			</div>
		</>
	)
}