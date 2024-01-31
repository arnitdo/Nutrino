import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <Card heading={"SIGN UP"}>
        <form>
          <div className={"flex flex-col gap-2"}>
            <p className="font-bold mt-2">Name :</p>
            <Input placeholder={"Enter Name : "} type={"text"} />
            <p className="font-bold mt-2">Email :</p>
            <Input placeholder={"Enter Email : "} type={"email"} />
            <p className="font-bold mt-2">Password :</p>
            <Input placeholder={"Enter Password : "} type={"password"} />
            <div className="mt-4 justify-center flex">
              <Button>
                Sign Up
              </Button>
            </div>
            <p className="font-bold mt-2">Already have an account?
              <Link to={"/login"} className="pl-2 font-extrabold text-green-800 underline">Login Here</Link></p>
          </div>
        </form>
      </Card>
    </div>
  )
}