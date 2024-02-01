import React, { useEffect, useState } from 'react'
import Paper from '../components/Paper'
import Button from '../components/Button'
import Input from '../components/Input'
import store from '../lib/zustand'
import ImageCard from '../components/ImageCard'
import { Link, useNavigate } from 'react-router-dom'

const Community = () => {
  const {backend_url} = store()
  const [recipes, setrecipes] = useState([])
  const [dish, setDish] = useState("")
  const navigate = useNavigate()
  const url = "http://localhost:5050/api"
  const handleRecipeSearch = async () => {
    if (dish === "") {
      return
    }
    const res = await fetch(`${backend_url}/recipe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setrecipes(data)
  }

  const getData = async () => {
    const res = await fetch(`${backend_url}/recipe/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data)
    setrecipes(data)
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div className=' flex flex-col justify-start items-center w-full bg-dorange min-h-screen pb-8 px-24'>
      
      <div className={`w-[80vw] flex flex-row gap-2 justify-center items-center py-12`}>
          <Input placeholder='Search for dishes here' value={dish} grow setValue={setDish} />
          <Button onClick={() => { handleRecipeSearch() }}>Search</Button>
        </div>
      <Paper>
					<div className={"bg-lavender w-[80vw] relative flex flex-col lg:flex-row justify-between items-center p-8 text-bold"}>
						<div className={"text-4xl"}>
							Be a part of the Comunity!
						</div>
						<div className={"text-lg"}>
							Share your allergy-free recipes and help others like yourself!
						</div>
            <button onClick={()=>{
              navigate('/community/share')
            }}
      className="w-fit h-fit p-1 cursor-pointer hover:scale-90 transition-all rounded-full border-2 translate-x-1/2 translate-y-1/2 flex flex-row justify-center items-center  bg-dgreen absolute bottom-0 right-0  border-black bg-cover bg-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] "
    >
      <h2 className=' text-6xl h-16 w-16 text-center font-extrabold'>+</h2>
    </button>
					</div>
				</Paper>
        <div className={recipes.length == 0 ? "hidden" : ' w-full grid grid-cols-5 gap-7 py-12'}>
          {
            recipes.map((recipe, index) => {
              return (
                <Link to={`/community/recipe/${recipe._id}?name=${recipe.title}&image=${recipe.image}`} className=' flex w-full justify-center items-center hover:scale-95 transition-all'>
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

export default Community