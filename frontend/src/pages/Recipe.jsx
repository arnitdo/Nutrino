import React, { useRef, useState } from 'react'
import store from '../lib/zustand';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Input from '../components/Input';
import ImageCard from '../components/ImageCard';
import { Link } from 'react-router-dom';

export default function Recipe() {
  const videoRef = useRef(null);
  const [rearCamera, setRearCamera] = useState(true);
  const [capturedFrame, setCapturedFrame] = useState(null);
  const [ingredients, setIngredients] = useState([])
  const [dish, setDish] = useState("")
  const [recipes, setrecipes] = useState([])
  const { backend_url, api, user } = store()
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
      const res = await fetch(`http://127.0.0.1:5000/ingredientsfetch`, {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      console.log(data);
      const arr = Array.from(data.result.split(",").map(i=>i.trim()))
      const nonAllergic = arr.filter((a)=>(!user.allergies.includes(a)&&!user.avoids.includes(a)))
      for(let i=0;i < nonAllergic.length; i=i+2){
      handleIngredientSearch(nonAllergic.length>i+1?[nonAllergic[i],nonAllergic[i+1]]:[nonAllergic[i]])
      }
      console.log({ arr })
      setIngredients(arr)
    }, 'image/jpeg');
  };

  // Initialize camera on component mount
  React.useEffect(() => {
    getMedia();
  }, []);

  const handleIngredientSearch = async (ingredients) => {
    if (ingredients.length === 0) {
      return
    }
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api}&includeIngredients=${ingredients.join(",")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data);
    setrecipes((prev)=>[...prev,...data.results])
  }

  const handleRecipeSearch = async () => {
    if (dish === "") {
      return
    }
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${dish}&apiKey=${api}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setrecipes(data.results)

  }
  return (
    <div className=' flex w-full flex-col bg-lorange' >
      <div className={`flex flex-col flex-grow items-center ${recipes.length === 0 ? "bg-lorange" : "bg-lavender"}`}>
        <div className={`flex flex-row p-8 ${recipes.length === 0 ? "bg-lorange justify-center" : "justify-between bg-lavender"} items-start w-full`}>
          <div className="flex flex-col gap-4">
            {capturedFrame ? (
              null
            ) : (
              <h1 className={`text-3xl font-bold flex-grow py-4 text-center ${recipes.length === 0 ? "text-black" : "text-black"}`}> SCAN YOUR INGREDIENTS HERE</h1>
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
              <h1 className={`font-extrabold ${recipes.length === 0 ? "text-black" : "text-black"} text-4xl`}>{capturedFrame ? "This image consists of" : ""}</h1>
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
                          return <li className='font-bold text-xl' key={index}>{ingredient}</li>
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
      <div className={"flex flex-col gap-2 flex-grow justify-between items-center p-8"}>
        <div className={`w-[80vw] flex flex-row gap-2 justify-center items-center`}>
          <Input placeholder='Search for dishes here' value={dish} grow setValue={setDish} />
          <Button onClick={() => { handleRecipeSearch() }}>Search</Button>
        </div>
        <div className={recipes.length == 0 ? "hidden" : ' w-full grid grid-cols-5 gap-7 py-10'}>
          {
            recipes.map((recipe, index) => {
              return (
                <Link to={`/recipe/${recipe.id}?name=${recipe.title}&image=${recipe.image}`} className=' flex w-full justify-center items-center hover:scale-95 transition-all'>
                  <ImageCard imageUrl={recipe.image} key={index}>
                    {recipe.title}
                  </ImageCard>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
} 