export default function Card({heading, children, headingColor = "bg-dgreen", bgColor = "bg-lgreen"}) {
	return (
		<div
			className={`rounded-md border-2 border-black ${bgColor} font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
			<div className={`border-b-2 border-black p-4 ${headingColor}`}>
				<h2 className={`text-lg font-extrabold`}>{heading}</h2>
			</div>
			<div className="p-4">
				{children}
			</div>
		</div>
	)
}
  