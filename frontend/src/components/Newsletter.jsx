import { useState } from 'react'

export default function Newsletter() {
  return (
   <div className={"flex flex-col gap-4 font-bold text-white"}>
     Sign Up For Our Newsletter
     <div
      className="flex w-min items-center rounded-md border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <input
        className="w-[30ch] rounded-md p-[10px] outline-none"
        type="text"
        name="email"
        id="email"
        placeholder="Email"
      />
      <button
        className="rounded-e-[5px] border-l-2 border-black text-black bg-lgreen p-[10px] px-5"
        type="submit"
        aria-label="Submit Newsletter"
      >
        Submit
      </button>
    </div>
   </div>
  )
}
