import React, { useEffect, useState } from 'react'
import store from '../lib/zustand'
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import purplebg from "../assets/purplebg.png"
export default function Hello() {
    const { user, setUser, Logout, setMessage, setType, setToast, backend_url } = store()

    const [userProfile, setUserProfile] = useState(user)

    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate("/login")
        }
    }, [user])

    const handleOnboard = async (e) => {
        e.preventDefault()
        const url = backend_url

        const authToken = localStorage.getItem("auth-token")
        if (!authToken) {
            return
        }

        try {
            const res = await fetch(`${url}/auth/onboard`, {
                method: "PUT",
                body: JSON.stringify(userProfile),
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                }
            })
            const data = await res.json()
            if (data.error) {
                setMessage(data.error)
                setType("danger")
                setToast(true)
                return
            }
            setUser(data.user)
            setMessage("Preferences Updated!")
            setType("success")
            setToast(true)
        } catch (error) {
            console.error(error)
            setMessage("Something went wrong!")
            setType("danger")
            setToast(true)
        }
    }

    const arrToString = (arr) => {
        if (arr.length === 1) {
            return arr[0]
        }
        return arr.reduce((prevVal, currVal, idx, arr) => {
            if (idx == 0){
                return currVal
            }
            return `${prevVal}, ${currVal}`
        }, "")
    }

    if (user === null) {
        return null;
    }

    return (
        <>
            <div
                style={{ backgroundImage: `url(${purplebg})` }}
                className={"w-screen h-screen flex-grow flex justify-center items-center"}
            >
                <Card heading={"MY PROFILE"} headingColor={"bg-dgreen"}>
                    <form onSubmit={handleOnboard}>
                        <div className={"flex flex-col gap-8"}>
                            <div className='flex flex-row gap-8 p-8 '>
                                <div className={"flex flex-col gap-4"}>
                                    <p className="font-bold mt-2">Name :</p>
                                    <Input
                                        value={user.name}
                                        type={"text"}
                                        disabled
                                    />
                                    <p className="font-bold mt-2">Prefers :</p>
                                    <Input value={arrToString(userProfile.prefers)}
                                        setValue={(newVal) => {
                                            setUserProfile(prevProfile => {
                                                return {
                                                    ...prevProfile,
                                                    prefers: newVal.split(",").map((eachStr) => eachStr.trim())
                                                }
                                            })
                                        }}
                                        type={"text"}
                                    />
                                    <p className="font-bold mt-2">Avoid :</p>
                                    <Input
                                        value={arrToString(userProfile.avoids)}
                                        setValue={(newVal) => {
                                            setUserProfile(prevProfile => {
                                                return {
                                                    ...prevProfile,
                                                    avoids: newVal.split(",").map((eachStr) => eachStr.trim())
                                                }
                                            })
                                        }}
                                        type={"text"}
                                    />
                                    <p className="font-bold mt-2">Allergies :</p>
                                    <Input
                                        value={arrToString(userProfile.allergies)}
                                        setValue={(newVal) => {
                                            setUserProfile(prevProfile => {
                                                return {
                                                    ...prevProfile,
                                                    allergies: newVal.split(",").map((eachStr) => eachStr.trim())
                                                }
                                            })
                                        }}
                                        type={"text"}
                                    />
                                    <button className='flex-grow bg-red-500 border-2 rounded-md border-black p-2 hover:scale-95  mt-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' onClick={(e) => {
                                    e.preventDefault()
                                    Logout();
                                    localStorage.setItem("auth-token", null)
                                    setMessage("Logged Out");
                                    setToast(true)
                                    setType("info")
                                }}>
                                    Logout 
                                </button>
                                </div>
                                <div className={"flex flex-col gap-4"}>

                                    <p className="font-bold mt-2">Email :</p>
                                    <Input value={userProfile.email}
                                        type={"email"} disabled />

                                    <p className="font-bold mt-2">Age :</p>
                                    <Input value={userProfile.age}
                                        setValue={(newVal) => {
                                            setUserProfile((prevProfile) => {
                                                return {
                                                    ...prevProfile,
                                                    age: newVal
                                                }
                                            })
                                        }}
                                        type={"text"}
                                    />
                                    <p className="font-bold mt-2">Weight :</p>
                                    <Input value={userProfile.weight}
                                        setValue={(newVal) => {
                                            setUserProfile((prevProfile) => {
                                                return {
                                                    ...prevProfile,
                                                    weight: newVal
                                                }
                                            })
                                        }}
                                        type={"text"}
                                    />
                                    <p className="font-bold mt-2">Height :</p>
                                    <Input value={userProfile.height}
                                        setValue={(newVal) => {
                                            console.log(newVal)
                                            setUserProfile((prevProfile) => {
                                                return {
                                                    ...prevProfile,
                                                    height: newVal
                                                }
                                            })
                                        }}
                                        type={"text"}
                                    />
                                    <button type="submit" className='bg-dgreen border-2 rounded-md border-black p-2 mt-8 hover:scale-95  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                                    Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </>

    )
}
