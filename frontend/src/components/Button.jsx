const BUTTON_COLOR_MAPPING = {
  primary: "bg-dgreen",
  secondary: "bg-lgreen",
  danger: "bg-lorange",
  empty: "bg-none"
}

export default function Button({ children, onClick, color="primary", type, grow, disabled }) {
  return (
    <button
      type={type}
      disabled={disabled}
      role="button"
      aria-label={"Click to perform an action"}
      onClick={onClick}
      className={`flex cursor-pointer justify-center items-center rounded-md ${grow ? "flex-grow" : ""} border-2 border-black ${BUTTON_COLOR_MAPPING[color]} px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none`}
    >
      {children}
    </button>
  )
}
