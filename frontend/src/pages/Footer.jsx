import logo from '../assets/nutrino-logo.png';
import {Link, useNavigate} from "react-router-dom";
import Button from '../components/Button';
import Newsletter from '../components/Newsletter';

export default function Footer(){
    return(
        <>
        <div className="p-10 bg-black">
            <div className="flex flex-row justify-between gap-12 items-center">
                <img src={logo} className='h-20 '/>
                <div className='flex flex-col text-white gap-5 font-bold text-xl'>
                    <Link to={"/"}>Homepage</Link>
                    <Link to={"/signup"}>Sign Up</Link>
                    <Link to={"/login"}>Login</Link>
                    </div>
                    <div className='flex flex-col text-white gap-5 font-bold text-xl'>
                    <Link to={"/recipe"}>Recipe</Link>
                    <Link to={"/productscanner"}>Product Scanner</Link>
                    <Link to={"/community"}>Community</Link>
                    </div>
                <Newsletter />
            </div>
            </div>
        </>
    );
}