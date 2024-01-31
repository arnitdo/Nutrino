import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import store from '../lib/zustand'
import StepsAccordion from '../components/StepsAccordian'
import Button from '../components/Button'
import Paper from '../components/Paper'
import CanvasJSReact from '@canvasjs/react-charts';
import { GiSpeaker } from "react-icons/gi";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function RecipeId() {
    const { id } = useParams()
    const { api } = store()
    const search = useLocation().search
    const query = new URLSearchParams(search)
    const name = query.get('name')
    const image = query.get('image')

    const [taste, setTaste] = useState({
        "sweetness": 28.79,
        "saltiness": 26.74,
        "sourness": 6.22,
        "bitterness": 12.38,
        "savoriness": 11.8,
        "fattiness": 100,
        "spiciness": 0
    }
    )
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        backgroundColor: "transparent",
        title: {
            text: "Taste Analysis"
        },
        data: [{
            type: "bar",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: Array.from(Object.keys(taste).map((key) => ({ y: taste[key], label: key })))
        }]
    }


    const [nutrients, setNutrients] = useState([
        {
            "name": "Calories",
            "amount": 316.49,
            "unit": "kcal",
            "percentOfDailyNeeds": 15.82
        },
        {
            "name": "Fat",
            "amount": 12.09,
            "unit": "g",
            "percentOfDailyNeeds": 18.6
        },
        {
            "name": "Saturated Fat",
            "amount": 3.98,
            "unit": "g",
            "percentOfDailyNeeds": 24.88
        },
        {
            "name": "Carbohydrates",
            "amount": 49.25,
            "unit": "g",
            "percentOfDailyNeeds": 16.42
        },
        {
            "name": "Net Carbohydrates",
            "amount": 46.76,
            "unit": "g",
            "percentOfDailyNeeds": 17.0
        },
        {
            "name": "Sugar",
            "amount": 21.98,
            "unit": "g",
            "percentOfDailyNeeds": 24.42
        },
        {
            "name": "Cholesterol",
            "amount": 1.88,
            "unit": "mg",
            "percentOfDailyNeeds": 0.63
        },
        {
            "name": "Sodium",
            "amount": 279.1,
            "unit": "mg",
            "percentOfDailyNeeds": 12.13
        },
        {
            "name": "Protein",
            "amount": 3.79,
            "unit": "g",
            "percentOfDailyNeeds": 7.57
        }
    ])

    const options2 = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        backgroundColor: "transparent",
        title: {
            text: "Nutrition Analysis"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}mg",
            startAngle: -90,
            dataPoints: Array.from(nutrients.map((n) => ({ y: n.amount, label: n.name })))
        }]
    }

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
            const res = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${api}`)
            const data = await res.json()

            setRecipe(data[0])
            const res2 = await fetch(`https://api.spoonacular.com/recipes/${id}/tasteWidget.json?apiKey=${api}`)
            const data2 = await res2.json()
            setTaste(data2)

            const res3 = await fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${api}`)
            const data3 = await res3.json()
            console.log(data3);

        }
        //https://api.spoonacular.com/recipes/{id}/tasteWidget.json

        // getRecipe()
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
            const textToSpeak = `Step ${step.number}: ${step.step}`;
            setTimeout(() => speak(textToSpeak), index * 2000); // Adjust delay as needed
        });
        setTimeout(() => setSpeaking(false), recipe.steps.length * 2000); // Adjust delay as needed
    };

    const firstRow = recipe.steps.filter((elem, idx) => {
        return idx <= 4
    })

    const secondRow = recipe.steps.filter((elem, idx) => {
        return (idx > 4)
    })

    const recipeColumns = Array(5).fill(0).map((_, idx) => {
        const upperStep = firstRow[idx];
        const lowerStep = secondRow[idx];
        return [upperStep, lowerStep]
    })

    const [activeIndex, setActiveIndex] = useState(-1)
    return (
        <div className='flex flex-col gap-4 w-screen px-[10vw] py-[10vh] bg-lavender'>
            <div className="flex flex-row w-full gap-5 justify-between items-center">
                <img className=' w-fit h-fit rounded-md border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' src={image} alt="" />
                <h2 className=' text-5xl font-extrabold '>{name}</h2>
                <Button className=' text-white font-bold py-2 px-4 rounded'
                    onClick={handleSpeakClick}
                    disabled={speaking}>
                    <GiSpeaker className={"h-6 w-6"} />
                </Button>
            </div>
            <div className="flex flex-row gap-4 w-full">
                {
                    recipeColumns.map((stepPair, index) => {
                        const [upperStep, lowerStep] = stepPair
                        return (
                            <div className={"flex flex-col gap-4"}>
                                <StepsAccordion key={index} question={`Step ${upperStep.number}`} active={activeIndex === index} setActive={setActiveIndex} index={index}>
                                    <div className={`p-2 flex flex-col ${index % 2 ? "bg-lgreen" : "bg-lorange"}  gap-2 w-full`}>
                                        {upperStep.equipment.length > 0 ?
                                            <div className='flex flex-col gap-1 items-start justify-between'>
                                                <h3 className='text-lg font-bold'>Equipments&nbsp;:</h3>
                                                <p className='font-normal'>{(Array.from(upperStep.equipment.map((e, ind) => (e.name)))).join(", ")}</p>
                                            </div> : <></>}
                                        {upperStep.ingredients.length > 0 ?
                                            <div className='flex flex-col gap-1 items-start justify-between'>
                                                <h3 className='text-lg font-bold'>Ingredients&nbsp;:</h3>
                                                <p className='font-normal'>{(Array.from(upperStep.ingredients.map((e, ind) => (e.name)))).join(", ")}</p>
                                            </div> : <></>}
                                        <div className='flex flex-col gap-1 items-start justify-between'>
                                            <h3 className='text-lg font-bold text-nowrap'>Procedure&nbsp;:</h3>
                                            <p className='font-normal pt-[2.5px] '>{upperStep.step}</p>
                                        </div>
                                    </div>
                                </StepsAccordion>
                                <StepsAccordion key={index} question={`Step ${lowerStep.number}`} active={activeIndex === (5 + index)} setActive={setActiveIndex} index={5 + index}>
                                    <div className={`p-2 flex flex-col ${(index + 5) % 2 ? "bg-lgreen" : "bg-lorange"}  gap-2 w-full`}>
                                        {lowerStep.equipment.length > 0 ?
                                            <div className='flex flex-col gap-1 items-start justify-between'>
                                                <h3 className='text-lg font-bold'>Equipments&nbsp;:</h3>
                                                <p className='font-normal'>{(Array.from(lowerStep.equipment.map((e, ind) => (e.name)))).join(", ")}</p>
                                            </div> : <></>}
                                        {lowerStep.ingredients.length > 0 ?
                                            <div className='flex flex-col gap-1 items-start justify-between'>
                                                <h3 className='text-lg font-bold'>Ingredients&nbsp;:</h3>
                                                <p className='font-normal'>{(Array.from(lowerStep.ingredients.map((e, ind) => (e.name)))).join(", ")}</p>
                                            </div> : <></>}
                                        <div className='flex flex-col gap-1 items-start justify-between'>
                                            <h3 className='text-lg font-bold text-nowrap'>Procedure&nbsp;:</h3>
                                            <p className='font-normal pt-[2.5px] '>{lowerStep.step}</p>
                                        </div>
                                    </div>
                                </StepsAccordion>
                            </div>
                        )
                    })
                }
            </div>
            {/* <Button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleSpeakClick}
                    disabled={speaking}
                >
                    {speaking ? 'Speaking...' : 'Speak Recipe'}
                </Button> */}

            <div className='flex w-full flex-row gap-4'>
                <Paper grow>
                    <div className={"p-4 bg-dorange"}>
                        <CanvasJSChart options={options}
                        /* onRef={ref => this.chart = ref} */
                        /* containerProps={{ width: '100%', height: '300px' }} */
                        />
                    </div>
                </Paper>
                <Paper grow>
                    <div className={"p-4 bg-dorange"}>
                        <CanvasJSChart options={options2}
                        /* onRef={ref => this.chart = ref} */
                        /* containerProps={{ width: '100%', height: '300px' }} */
                        />
                    </div>
                </Paper>
            </div>
        </div>
    );
}