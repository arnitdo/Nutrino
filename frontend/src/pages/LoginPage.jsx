import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <Card heading={"LOGIN"}>
        <form>
          <div className={"flex flex-col gap-2"}>
            <p className="font-bold mt-2">Email :</p>
            <Input placeholder={"Enter Email : "} type={"email"} />
            <p className="font-bold mt-2">Password :</p>
            <Input placeholder={"Enter Password : "} type={"password"} />
            <div className="mt-4 justify-center flex">
              <Button>
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