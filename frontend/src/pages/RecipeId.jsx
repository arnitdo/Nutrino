import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import store from '../lib/zustand'
import StepsAccordion from '../components/StepsAccordian'

export default function RecipeId() {
    const {id} = useParams()
    const {api} = store()
    const search = useLocation().search
    const query = new URLSearchParams(search)
    const name = query.get('name')
    const image = query.get('image')
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
        const res = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${api}`);
        const data = await res.json();
        setRecipe(data);
      };
      // Uncomment the line below to fetch recipe data
      // getRecipe();
    }, [id, api]);
  
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
  
    return (
      <div className='flex flex-col w-full py-12 px-24'>
        <div className='flex flex-col gap-5 p-5 rounded-md bg-dorange border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <div className="flex flex-row w-full gap-5 justify-start items-center">
            <img className='w-fit h-fit rounded-md border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' src={image} alt="" />
            <h2 className='text-5xl font-semibold'>{name}</h2>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {
              recipe.steps.map((step, index) => {
                return (
                  <StepsAccordion key={index} question={`Step ${step.number}`} >
                    <div className='p-2 flex flex-col gap-2 w-full'>
                      {step.equipment.length > 0 ?
                        <div className='flex flex-row gap-1 items-center justify-start'>
                          <h3 className='text-lg font-bold'>Equipments :</h3>
                          <p className='font-normal'>{(Array.from(step.equipment.map((e, ind) => (e.name)))).join(", ")}</p>
                        </div> : <></>}
                      {step.ingredients.length > 0 ?
                        <div className='flex flex-row gap-1 items-center justify-start'>
                          <h3 className='text-lg font-bold'>Ingredients :</h3>
                          <p className='font-normal'>{(Array.from(step.ingredients.map((e, ind) => (e.name)))).join(", ")}</p>
                        </div> : <></>}
                      <div className='flex flex-row gap-1 items-start justify-start'>
                        <h3 className='text-lg font-bold text-nowrap'>Procedure :</h3>
                        <p className='font-normal pt-[2.5px] '>{step.step}</p>
                      </div>
                    </div>
                  </StepsAccordion>
                )
              })
            }
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleSpeakClick}
            disabled={speaking}
          >
            {speaking ? 'Speaking...' : 'Speak Recipe'}
          </button>
        </div>
      </div>
    );
}