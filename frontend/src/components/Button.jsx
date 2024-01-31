export default function Button({ children, onClick, type }) {
  return (
    <button
      type={type}
      role="button"
      aria-label={"Click to perform an action"}
      onClick={onClick}
      className="flex cursor-pointer font-extrabold justify-center items-center rounded-md border-2 border-black bg-dgreen px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
    >
      {children}
    </button>
  )
}
