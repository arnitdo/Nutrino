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
  const [recipes,setrecipes] = useState([{"id":638245,"title":"Chicken Pasta With Anchovy Rosemary Sauce","image":"https://spoonacular.com/recipeImages/638245-312x231.jpg","imageType":"jpg"},
  {"id":638236,"title":"Chicken Pasta Primavera - Flower Patch Farmgirl Style","image":"https://spoonacular.com/recipeImages/638236-312x231.jpg","imageType":"jpg"},
  {"id":606953,"title":"Cajun Chicken Pasta","image":"https://spoonacular.com/recipeImages/606953-312x231.jpg","imageType":"jpg"},
  {"id":1096054,"title":"Spicy Chicken Pasta and Peas with Sun-Dried Tomato Sauce","image":"https://spoonacular.com/recipeImages/1096054-312x231.jpg","imageType":"jpg"},
  {"id":645651,"title":"Grilled Chicken Pasta With Gorgonzola Walnut Cream Sauce","image":"https://spoonacular.com/recipeImages/645651-312x231.jpg","imageType":"jpg"},
  {"id":637923,"title":"Chicken and Penne Pasta With Garlic Rosemary Sauce","image":"https://spoonacular.com/recipeImages/637923-312x231.jpg","imageType":"jpg"},
  {"id":654901,"title":"Pasta With Chicken and Broccoli","image":"https://spoonacular.com/recipeImages/654901-312x231.jpg","imageType":"jpg"},
  {"id":654913,"title":"Pasta With Chicken and Mushrooms","image":"https://spoonacular.com/recipeImages/654913-312x231.jpg","imageType":"jpg"},
  {"id":638235,"title":"Chicken Parmesan With Pasta","image":"https://spoonacular.com/recipeImages/638235-312x231.jpg","imageType":"jpg"},
  {"id":655582,"title":"Penne Pasta With Chicken And Mushrooms","image":"https://spoonacular.com/recipeImages/655582-312x231.jpg","imageType":"jpg"}])
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
    canvas.toBlob(async(blob) => {
      // Handle the captured blob as needed (e.g., upload to server)
      setCapturedFrame(URL.createObjectURL(blob));
      const formData = new FormData();
      formData.append('image', blob);
      const res = await fetch(`http://127.0.0.1:5000/ingredientsfetch`,{
        method: "POST",
        body: formData
      })
      const data = await res.json()
      console.log(data);
      const arr = data.result.replace(/ /g, "").split(",")
      setIngredients(arr)
    }, 'image/jpeg');
  };

  // Initialize camera on component mount
  React.useEffect(() => {
    getMedia();
  }, []);

  const handleRecipeSearch = async () => {
    if(dish===""){
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
    <div className=' flex w-full flex-col py-6'>
      <div className=' flex w-full flex-row justify-between items-center px-12 py-6'>
      <h1 className=' text-3xl font-bold py-2 '> Scan your ingredients here</h1>
        <div className=' flex flex-row gap-2 justify-center items-center'>
        <Input placeholder='Search for dishes here' value={dish} setValue={setDish} />
        <Button onClick={()=>{handleRecipeSearch()}}>Search</Button>
        </div>
      </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className="flex flex-col gap-5 px-8">
          {capturedFrame ? (
        <img className=' rounded-lg' src={capturedFrame} alt="Captured Frame" />
      ) : (
        <video className=' rounded-lg' ref={videoRef} autoPlay playsInline />
      )}
      <div className="flex flex-row w-full justify-between items-center">
      <Button color='secondary' onClick={switchCamera}>Switch Camera</Button>
      <Button color='primary' onClick={captureFrame}>Capture Frame</Button>
      </div>
      </div>
      <div className=' flex flex-col gap-5 w-full'>
        <h1 className='font-extrabold text-2xl'>{capturedFrame?"This image consists of":"Capture to extract ingredients"}</h1>
        <div className=' flex flex-col gap-2'>
          <ul>
        {capturedFrame&&ingredients.length===0?
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
    <div className=' w-full grid grid-cols-4 gap-4 py-8'>
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
  )
}
