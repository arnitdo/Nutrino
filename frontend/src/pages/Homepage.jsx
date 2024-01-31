import ImageCard from "../components/Image";
import hero_image from '../assets/hero_image.png';
import scanner from '../assets/scanner.png';
import allergyfree from '../assets/allergyfree.png';
import sharerecipe from '../assets/sharerecipe.png';
import hero_bg from '../assets/hero_bg.png';
import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";
import Faqs from "../components/Faqs";
import Marquee from "../components/Marquee";
import Features from "./Features";
export default function Homepage() {
    return (
        <>
            <div className={"w-screen min-h-screen flex flex-col justify-center items-center bg-lgreen"}>
                <div style={{backgroundImage: `url(${hero_bg})`, backgroundClip: "border-box"}} className="h-[90vh] w-screen bg-cover pb-16 flex flex-row justify-center items-center">
                    <div className="text-6xl font-bold flex flex-col gap-8 justify-around">
                        <p>
                           <span className="underline font-extrabold">Nutrino</span> - Where Wellness 
                           </p>
                           <div className="justify-center flex">
                            Meets Wisdom
                            </div>
                       
                        <div className="text-xl justify-center flex">

                            <Button>Let's Get Started →</Button>
                        </div>
                    </div>
                </div>
               <div className="pb-10">
                 <Marquee items={["Nutrino",  "Wellness", "Wisdom", "Nutrino",  "Wellness", "Wisdom", "Nutrino",  "Wellness", "Wisdom"]}/>
                </div>
                <div className="flex flex-row gap-8 pb-10">
                    <FeatureCard heading={"Effortless Product Scanning"} imageUrl={scanner} paragraph={"Scan product barcode to access detailed."}/>
                    <FeatureCard heading={"Allergy and Dietary Filters"} imageUrl={allergyfree} paragraph={"Customize your preferences & recieve notifications"} />
                    <FeatureCard heading={"Community Recipe Sharing"} imageUrl={sharerecipe} paragraph={"Share your recipe with your loved ones."}/>
                </div>
               <div className="pb-10">
                <Features/>
               </div>
               <div className="flex flex-col gap-5 pb-10">
                <Faqs question={"Do you provide Religious Food Avoidance Details?"} answer={"Yes, We do provide"}/>
                <Faqs question={"Do you provide Food Recommendation based on my allergies?"} answer={"Yes, We do provide"}/>
                <Faqs question={"Which all products can I scan?"} answer={"Any Picture of Food is accepted"}/>
                </div> 
            </div>
        </>
    )
}