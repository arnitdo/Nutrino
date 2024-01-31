import React, { useRef, useState } from 'react';
import store from '../lib/zustand';
import Button from '../components/Button';
import Loader from '../components/Loader';

export default function ProductScanner() {
	const videoRef = useRef(null);
	const [rearCamera, setRearCamera] = useState(true);
	const [capturedFrame, setCapturedFrame] = useState(null);
	const [ingredients, setIngredients] = useState([]);
	const [allergic, setAllergic] = useState([]);
	const [dish, setDish] = useState("");
	const { backend_url, api, user } = store();

	const getMedia = async () => {
		try {
			const constraints = {
				video: {
					facingMode: rearCamera ? 'environment' : 'user',
				},
			};
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			videoRef.current.srcObject = stream;
		} catch (error) {
			console.error('Error accessing camera:', error);
		}
	};

	const switchCamera = () => {
		setRearCamera(!rearCamera);
		getMedia();
	};

	function includesAnyWord(inputList, searchString) {
		// Convert the search string into an array of words
		inputList = inputList.map((i) => i.toLowerCase())
		searchString = searchString.toLowerCase()
		const searchWords = searchString.split(/\s+/);

		// Check if any word from the search string is included in the list
		return searchWords.some(word => inputList.includes(word));
	}

	function matchSingularPlural(wordList, searchTerm) {
		const singular = searchTerm;
		const plural = searchTerm + 's';
		const plural2 = searchTerm + 'es';
		const plural3 = searchTerm.slice(0, -1) + 'ies';

		// Check if either singular or plural form is in the word list
		return wordList.includes(singular) || wordList.includes(plural) || wordList.includes(plural2) || wordList.includes(plural3);
	}

	const captureFrame = () => {
		const canvas = document.createElement('canvas');
		const video = videoRef.current;
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		canvas.toBlob(async (blob) => {
			setCapturedFrame(URL.createObjectURL(blob));
			const formData = new FormData();
			formData.append('image', blob);
			const res = await fetch(`http://127.0.0.1:5000/geminiocr`, {
				method: "POST",
				body: formData
			});
			const data = await res.json();

			console.log(data);
			if (data.result.includes(",")) {
				const arr = data.result.split(",");
				const allergicArr = arr.filter((a) => (includesAnyWord(user.allergies, a) || includesAnyWord(user.avoids, a)))
				setAllergic(allergicArr)
				console.log(allergicArr)
				setIngredients(arr);
			} else {
				const arr = data.result.replace(/-/g, "").split("\n");
				setIngredients(arr);
			}
		}, 'image/jpeg');
	};

	// Initialize camera on component mount
	React.useEffect(() => {
		getMedia();
	}, []);

	return (
		<div className={`flex w-full h-full justify-center items-center ${ingredients.length > 0 ? allergic.length > 0 ? " bg-red-600" : " bg-dgreen" : ""}`}>
			<div className='flex flex-col gap-5'>
				<div className="flex flex-col gap-5 px-8">
					<h1 className='font-extrabold text-2xl text-center pt-3'>Capture to extract ingredients</h1>
					{capturedFrame ? (
						<img className='rounded-lg' src={capturedFrame} alt="Captured Frame" />
					) : (
						<video className='rounded-lg' ref={videoRef} autoPlay playsInline />
					)}
					<div className="flex flex-row w-full justify-between items-center">
						<Button color='secondary' onClick={switchCamera}>Switch Camera</Button>
						<Button color='primary' onClick={captureFrame}>Capture Frame</Button>
					</div>
				</div>
				<div className='flex flex-col gap-5 w-full items-center pb-10'>
					<h1 className='font-extrabold text-2xl text-center'>{capturedFrame ? "This image consists of" : ""}</h1>
					<div className='flex flex-col gap-2 items-center'>
						<ul className=' list-disc'>
							{capturedFrame && ingredients.length === 0 ? (
								<Loader />
							) : (
								ingredients.map((ingredient, index) => (
									<li className={`font-bold text-xl ${allergic.includes(ingredient) ? " text-red-800 flex flex-row gap-3 justify-start items-center " : ""}`} key={index}>{ingredient}
										{allergic.includes(ingredient)?
											<span className=' py-1 px-2 text-xs rounded-xl bg-dorange  border border-slate-100'>
											Generate Alternative
										</span>:
										<></>
										}</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
