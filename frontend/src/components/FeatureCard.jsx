export default function Card({ imageUrl, heading, paragraph }) {
    return (
      <div className="w-[250px] rounded-md border-2 border-black bg-lorange font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="border-b-2 border-black bg-dorange p-4">
          <h2 className="text-lg justify-center text-center">{heading}</h2>
        </div>
       <div className="bg-lorange"> 
        <img className="w-[250px] h-[200px] " src={imageUrl} alt="image" />
        </div> 
        <figcaption className="border-t-2 border-black p-4 bg-dorange">
          {paragraph}
        </figcaption>
      </div>
    )
  }
  