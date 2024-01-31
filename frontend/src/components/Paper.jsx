export default function Paper({children, grow, flex, noBorder}) {
	return (
		<div
			className={`rounded-md  ${noBorder?"":"border-2 border-black"} font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${grow ? " flex-grow" : ""} ${flex ? " flex" : ""}`}>
			{children}
		</div>
	)
}
