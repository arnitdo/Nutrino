import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { Link, redirect, useNavigate } from "react-router-dom";
import store from "../lib/zustand";

export default function LoginPage() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {setToast, setMessage, setAuth} = store()
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    const url=import.meta.env.VITE_BACKEND_URL
    try {
    const res = await fetch(`${url}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
  })
  const data = await res.json()
  if(data.error){
    setMessage(data.error)
    setToast(true)
    return
  }
  const token = data.authToken
  localStorage.setItem("auth-token", token)
  setAuth(true)
  setMessage("Login successful")
  setToast(true)
  navigate("/me")
} catch (error) {
  setMessage("Something went wrong")
  setToast(true)
}
}
  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <Card heading={"LOGIN"}>
        <form onSubmit={(e)=>handleLogin(e)}>
          <div className={"flex flex-col gap-2"}>
            <p className="font-bold mt-2">Email :</p>
            <Input value={email} setValue={setemail} placeholder={"Enter Email : "} type={"email"} />
            <p className="font-bold mt-2">Password :</p>
            <Input value={password} setValue={setpassword} placeholder={"Enter Password : "} type={"password"} />
            <div className="mt-4 justify-center flex">
              <Button type={"submit"}>
                Login
              </Button>
            </div>
            <p className="font-bold mt-2">Don't have an account?
              <Link to={"/signup"} className="pl-2 font-extrabold text-green-800 underline">Sign Up Here</Link></p>
          </div>
        </form>
      </Card>
    </div>
  )
}