export default function Marquee({ items }) {
    return (
      <div className="relative flex w-screen overflow-x-hidden border-b-2 border-t-2 border-slate-900  bg-lavender font-bold">
        <div className="animate-marquee whitespace-nowrap py-8">
          {items.map((item, idx) => {
            return (
              <span key={idx} className="mx-4 text-4xl text-slate-950">
                {item}
              </span>
            )
          })}
        </div>
  
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-8">
          {items.map((item, idx) => {
            return (
              <span key={idx} className="mx-4 text-4xl text-slate-950">
                {item}
              </span>
            )
          })}
        </div>
  
        {/* must have both of there in order to work */}
      </div>
  
      // add this to tailwind.config.js
  
      // theme: {
      //   extend: {
      //     animation: {
      //       marquee: "marquee 5s linear infinite",
      //       marquee2: "marquee2 5s linear infinite",
      //     },
      //     keyframes: {
      //       marquee: {
      //         "0%": { transform: "translateX(0%)" },
      //         "100%": { transform: "translateX(-100%)" },
      //       },
      //       marquee2: {
      //         "0%": { transform: "translateX(100%)" },
      //         "100%": { transform: "translateX(0%)" },
      //       },
      //     },
      //   },
      // },
    )
  }
  