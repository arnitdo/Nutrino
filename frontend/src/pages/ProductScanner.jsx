import React, {useRef, useState} from 'react'
import store from '../lib/zustand';
import Button from '../components/Button';
import Loader from '../components/Loader';

export default function ProductScanner() {
	const videoRef = useRef(null);
	const [rearCamera, setRearCamera] = useState(true);
	const [capturedFrame, setCapturedFrame] = useState(null);
	const [ingredients, setIngredients] = useState([])
	const [dish, setDish] = useState("")
	const {backend_url, api} = store()
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

	const captureFrame = () => {
		const canvas = document.createElement('canvas');
		const video = videoRef.current;
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		canvas.toBlob(async (blob) => {
			// Handle the captured blob as needed (e.g., upload to server)
			setCapturedFrame(URL.createObjectURL(blob));
			const formData = new FormData();
			formData.append('image', blob);
			const res = await fetch(`http://127.0.0.1:5000/geminiocr`, {
				method: "POST",
				body: formData
			})
			const data = await res.json()
			console.log(data);
			if (data.result.includes(",")) {
				const arr = data.result.split(",")
				setIngredients(arr)
			} else {
				const arr = data.result.replace(/-/g, "").split("\n")
				setIngredients(arr)
			}
		}, 'image/jpeg');
	};

	// Initialize camera on component mount
	React.useEffect(() => {
		getMedia();

		const vidRef = videoRef.current

		return () => {
			vidRef.getTracks().forEach((trackObj) => {
				trackObj.stop()
			})
		}
	}, []);

	return (
		<div className=' flex w-full flex-col py-6'>
			<div className=' flex w-full flex-row justify-between items-center px-12 py-6'>
				<h1 className=' text-3xl font-bold py-2 '> Scan your ingredients here</h1>
			</div>
			<div className='flex flex-row justify-between items-center w-full'>
				<div className="flex flex-col gap-5 px-8">
					{capturedFrame ? (
						<img className=' rounded-lg' src={capturedFrame} alt="Captured Frame"/>
					) : (
						<video className=' rounded-lg' ref={videoRef} autoPlay playsInline/>
					)}
					<div className="flex flex-row w-full justify-between items-center">
						<Button color='secondary' onClick={switchCamera}>Switch Camera</Button>
						<Button color='primary' onClick={captureFrame}>Capture Frame</Button>
					</div>
				</div>
				<div className=' flex flex-col gap-5 w-full'>
					<h1 className='font-extrabold text-2xl'>{capturedFrame ? "This image consists of" : "Capture to extract ingredients"}</h1>
					<div className=' flex flex-col gap-2'>
						<ul>
							{capturedFrame && ingredients.length === 0 ?
								<>
									<Loader/>
								</>
								:
								ingredients.map((ingredient, index) => {
									return <li className='font-bold text-xl' key={index}>{ingredient}</li>
								})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
