import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import store from '../lib/zustand'
import StepsAccordion from '../components/StepsAccordian'
import Button from '../components/Button'
import Paper from '../components/Paper'
import CanvasJSReact from '@canvasjs/react-charts';
import { GiSpeaker } from "react-icons/gi";
import Input from '../components/Input'
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function CommunityRecipeId() {
    const { id } = useParams()
    const { api, backend_url } = store()
    const search = useLocation().search
    const query = new URLSearchParams(search)
    const name = query.get('name')
    const image = query.get('image')
    const [comments, setcomments] = useState([])
    const [comment, setcomment] = useState("")
    const [recipe, setRecipe] = useState({
        "name": "",
        "steps": [
            {
                "equipment": [
                    {
                        "id": 404784,
                        "image": "oven.jpg",
                        "name": "oven",
                        "temperature": {
                            "number": 200.0,
                            "unit": "Fahrenheit"
                        }
                    }
                ],
                "ingredients": [],
                "number": 1,
                "step": "Preheat the oven to 200 degrees F."
            },
            {
                "equipment": [
                    {
                        "id": 404661,
                        "image": "whisk.png",
                        "name": "whisk"
                    },
                    {
                        "id": 404783,
                        "image": "bowl.jpg",
                        "name": "bowl"
                    }
                ],
                "ingredients": [
                    {
                        "id": 19334,
                        "image": "light-brown-sugar.jpg",
                        "name": "light brown sugar"
                    },
                    {
                        "id": 19335,
                        "image": "sugar-in-bowl.png",
                        "name": "granulated sugar"
                    },
                    {
                        "id": 18371,
                        "image": "white-powder.jpg",
                        "name": "baking powder"
                    },
                    {
                        "id": 18372,
                        "image": "white-powder.jpg",
                        "name": "baking soda"
                    },
                    {
                        "id": 12142,
                        "image": "pecans.jpg",
                        "name": "pecans"
                    },
                    {
                        "id": 20081,
                        "image": "flour.png",
                        "name": "all purpose flour"
                    },
                    {
                        "id": 2047,
                        "image": "salt.jpg",
                        "name": "salt"
                    }
                ],
                "number": 2,
                "step": "Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl."
            },
            {
                "equipment": [
                    {
                        "id": 404661,
                        "image": "whisk.png",
                        "name": "whisk"
                    },
                    {
                        "id": 404783,
                        "image": "bowl.jpg",
                        "name": "bowl"
                    }
                ],
                "ingredients": [
                    {
                        "id": 2050,
                        "image": "vanilla-extract.jpg",
                        "name": "vanilla extract"
                    },
                    {
                        "id": 93622,
                        "image": "vanilla.jpg",
                        "name": "vanilla bean"
                    },
                    {
                        "id": 1230,
                        "image": "buttermilk.jpg",
                        "name": "buttermilk"
                    },
                    {
                        "id": 1123,
                        "image": "egg.png",
                        "name": "egg"
                    }
                ],
                "number": 3,
                "step": "Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl."
            },
            {
                "equipment": [],
                "ingredients": [
                    {
                        "id": 1123,
                        "image": "egg.png",
                        "name": "egg"
                    }
                ],
                "number": 4,
                "step": "Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix."
            },
            {
                "equipment": [],
                "ingredients": [],
                "length": {
                    "number": 15,
                    "unit": "minutes"
                },
                "number": 5,
                "step": "Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using."
            },
            {
                "equipment": [
                    {
                        "id": 404779,
                        "image": "griddle.jpg",
                        "name": "griddle"
                    },
                    {
                        "id": 404645,
                        "image": "pan.png",
                        "name": "frying pan"
                    }
                ],
                "ingredients": [],
                "length": {
                    "number": 3,
                    "unit": "minutes"
                },
                "number": 6,
                "step": "Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer."
            },
            {
                "equipment": [
                    {
                        "id": 404784,
                        "image": "oven.jpg",
                        "name": "oven",
                        "temperature": {
                            "number": 200.0,
                            "unit": "Fahrenheit"
                        }
                    }
                ],
                "ingredients": [],
                "number": 7,
                "step": "Transfer the pancakes to a platter and keep warm in a 200 degree F oven."
            },
            {
                "equipment": [],
                "ingredients": [
                    {
                        "id": 10014037,
                        "image": "bourbon.png",
                        "name": "bourbon"
                    }
                ],
                "number": 8,
                "step": "Serve 6 pancakes per person, top each with some of the bourbon butter."
            },
            {
                "equipment": [],
                "ingredients": [
                    {
                        "id": 19336,
                        "image": "powdered-sugar.jpg",
                        "name": "powdered sugar"
                    },
                    {
                        "id": 19911,
                        "image": "maple-syrup.png",
                        "name": "maple syrup"
                    }
                ],
                "number": 9,
                "step": "Drizzle with warm maple syrup and dust with confectioners' sugar."
            },
            {
                "equipment": [],
                "ingredients": [
                    {
                        "id": 12142,
                        "image": "pecans.jpg",
                        "name": "pecans"
                    }
                ],
                "number": 10,
                "step": "Garnish with fresh mint sprigs and more toasted pecans, if desired."
            }
        ]
    })

    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        const getRecipe = async () => {
            const res = await fetch(`${backend_url}/recipe/fetch/${id}`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)
            setRecipe(data)

            const res2 = await fetch(`${backend_url}/recipe/comment/${id}`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "auth-token":localStorage.getItem("auth-token")
                }
            })
            const data2 = await res2.json()
            console.log(data2)
            setcomments(data2)
        }
        //https://api.spoonacular.com/recipes/{id}/tasteWidget.json

        getRecipe()
    }, [])


    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        }
    };

    const handleSpeakClick = () => {
        setSpeaking(true);
        recipe.steps.forEach((step, index) => {
            console.log(step);
            const textToSpeak = `Step ${step.number}: ${step.step}`;
            setTimeout(() => speak(textToSpeak), index * 2000); // Adjust delay as needed
        });
        setTimeout(() => setSpeaking(false), recipe.steps.length * 2000); // Adjust delay as needed
    };

    const handleComment = async () => {
        const res = await fetch(`${backend_url}/recipe/comment/${id}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("auth-token")
            },
            body:JSON.stringify({content:comment})
        })
        const data = await res.json()
        console.log(data)
        setcomments([...comments, data])
        setcomment("")
    }

    const [activeIndex, setActiveIndex] = useState(-1)
    return (
        <div className='flex flex-col gap-4 w-screen px-[10vw] py-[10vh] bg-lavender'>
            <div className="flex flex-row w-full gap-5 justify-between items-center">
                <img className=' max-h-[350px] max-w-[400px] min-h-[300px] min-w-[300px] w-fit h-fit rounded-md border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' src={image} alt="" />
                <h2 className=' text-5xl font-extrabold '>{name}</h2>
                <Button className=' text-white font-bold py-2 px-4 rounded'
                    onClick={handleSpeakClick}
                    disabled={speaking}>
                    <GiSpeaker className={"h-6 w-6"} />
                </Button>
            </div>
            <div className="grid grid-cols-5 gap-4 w-full">
                {
                    recipe?recipe.steps.map((upperStep, index) => {
                        return (
                            <div className={"flex flex-col gap-4"}>
                                {upperStep?<StepsAccordion key={index} question={`Step ${upperStep?upperStep.number:""}`} active={activeIndex === index} setActive={setActiveIndex} index={index}>
                                    <div className={`p-2 flex flex-col ${index % 2 ? "bg-lgreen" : "bg-lorange"}  gap-2 w-full`}>
                                        {upperStep?upperStep.equipment.length > 0 ?
                                            <div className='flex flex-col gap-1 items-start justify-between'>
                                                <h3 className='text-lg font-bold'>Equipments&nbsp;:</h3>
                                                <p className='font-normal'>{upperStep.equipment.join(",")}</p>
                                            </div> : <></>:<></>}
                                        {upperStep?upperStep.ingredients.length > 0 ?
                                            <div className='flex flex-col gap-1 items-start justify-between'>
                                                <h3 className='text-lg font-bold'>Ingredients&nbsp;:</h3>
                                                <p className='font-normal'>{upperStep.ingredients.join(",")}</p>
                                            </div> : <></>: <></>}
                                        <div className='flex flex-col gap-1 items-start justify-between'>
                                            <h3 className='text-lg font-bold text-nowrap'>Procedure&nbsp;:</h3>
                                            <p className='font-normal pt-[2.5px] '>{upperStep?upperStep.step:""}</p>
                                        </div>
                                    </div>
                                </StepsAccordion>:<></>}
                                
                            </div>
                        )
                    }):<></>
                }
            </div>
            <div className="flex flex-col w-full gap-4 py-8">
                <div className=' flex flex-row w-full '>
                    <Input grow type={"text"} value={comment} setValue={setcomment} placeholder={"I really enjoyed this dish..."} ></Input>
                    <Button onClick={()=>{handleComment()}}>Send</Button>
                </div>
                <div className=' flex flex-col w-full rounded-md overflow-clip'>
                {comments.map((comment, index) => {
                    return (
                        <>
                        <div className=' flex w-full py-2 px-3 bg-dorange'>
                            <h3 className=' text-lg font-medium'>{comment.content}</h3>
                            <p className=' w-full text-xs font-thin text-end'>{((new Date(comment.createdAt).toLocaleDateString()))}</p>
                        </div>
                        <hr className=' w-full'/>
                        </>
                    )
                })}
                </div>
            </div>

            
        </div>
    );
}