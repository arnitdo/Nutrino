import React, { useEffect, useRef, useState } from 'react';
import store from '../lib/zustand';
import Button from '../components/Button';
import Loader from '../components/Loader';
import AltModal from '../components/AltModal';


const ItemCard = ({allergic, ingredient, index}) => {
	const [alt,setAlt] = useState(null)
	const {api} = store()
	const [active,setActive] = useState(false)
	let ctr=0
	const getAlternative = async () => {
		const nm = ingredient.trim().split(" ")[0]
		console.log(nm);
	  const res = await fetch(`https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${api}&ingredientName=${nm.toLowerCase()}`, {
		method: "GET",
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  const data = await res.json()
	  console.log(data);
	  if(data.status==="failure"){
		setAlt(data.message)
	  }else{
	  setAlt(data.substitutes)
	  }
	}
	useEffect(() => {
		if(allergic.includes(ingredient)&&ctr===0){
			// getAlternative()
			ctr=1
			}
	}, [])
	
	return (
	<li className={`font-bold text-xl ${!allergic.includes(ingredient)?"":" text-red-800 flex flex-row gap-2 justify-start items-center"} `} key={index}>
	  {ingredient}
	  <AltModal active={active} setActive={setActive} alt={alt} className=' fixed'>
										  </AltModal>
	  {allergic.includes(ingredient)?(
		<button onClick={()=>{setActive(true)}} className=' text-xs p-1 border rounded-xl bg-dorange'>Get Alternative</button>
	  ):<></>}</li>
	)
  }
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
			<div className={`flex flex-col flex-grow items-center ${true ? "bg-lorange" : "bg-lorange"}`}>
        <div className={`flex flex-row p-8 ${capturedFrame ? "bg-lorange justify-between" : "justify-center bg-lorange"} items-start w-full`}>
          <div className="flex flex-col gap-4">
            {capturedFrame ? (
              null
            ) : (
              <h1 className={`text-3xl font-bold flex-grow py-4 text-center ${true ? "text-black" : "text-black"}`}> SCAN YOUR PRODUCTS HERE</h1>
            )
            }
            {capturedFrame ? (
              <img className=' rounded-lg' src={capturedFrame} alt="Captured Frame" />
            ) : (
              <video className=' rounded-lg' ref={videoRef} autoPlay playsInline />
            )}
            <div className="flex flex-row w-full justify-between gap-8 items-center">
              <Button color='secondary' grow onClick={switchCamera}>Switch Camera</Button>
              <Button color='primary' grow onClick={captureFrame}>Capture Frame</Button>
            </div>
          </div>
          {capturedFrame ? (
            <div className=' flex flex-col flex-grow items-start justify-between gap-4 p-8'>
              <h1 className={`font-extrabold ${true ? "text-black" : "text-black"} text-4xl`}>{capturedFrame ? "This image consists of" : ""}</h1>
              <div className=' flex flex-col gap-2'>
                {capturedFrame && ingredients.length === 0 ?
                  (
                    <Loader />
                  )
                  :
                  (
                    <ul className=' list-disc px-8'>
                      {
                        ingredients.map((ingredient, index) => {
                          return <ItemCard ingredient={ingredient} allergic={allergic} index={index} />
                        })
                      }
                    </ul>
                  )
                }
              </div>
            </div>
          ) : (null)}
        </div>
        <div className={"flex-grow w-screen border-2 border-black"} />
      </div>
		</div>
	);
}
