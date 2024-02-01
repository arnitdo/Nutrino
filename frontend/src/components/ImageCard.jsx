import { useState } from "react"

  export default function ImageCard({ imageUrl, children }) {
    const [hover, sethover] = useState(false)
    return (
      <figure 
      onMouseEnter={()=>sethover(true)}
      onMouseLeave={()=>sethover(false)} className="w-[250px] h-[200px] overflow-hidden relative rounded-md border-2 border-black bg-dorange font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <img className="w-full h-full" src={imageUrl} alt="image" />
        <figcaption className={`${hover?" opacity-100":" opacity-0"} transition-all border-t-2 border-black p-4 absolute py-2 px-2 bottom-0 right-0 w-full text-slate-50 bg-slate-950 bg-opacity-60`}>
          {children}
        </figcaption>
      </figure>
    )
  }
  