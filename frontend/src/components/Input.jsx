export default function Input({type, name = "text", value, setValue, placeholder, grow, required = false}) {
	return (
		<input
			className={`${grow ? "flex-grow" : ""} rounded-md border-2 border-black p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none`}
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={(e) => {
				setValue(e.target.value)
			}}
			required={required}
			aria-label={placeholder}
		/>
	)
}
  