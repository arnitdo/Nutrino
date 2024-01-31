import { useEffect, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

export default function StepsAccordion({ question, children, active, setActive, index }) {
  const [showContent, setShowContent] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px')
  const contentRef = useRef(null)
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`)
    }
  }, [showContent])

  return (
    <div className="w-[15vw] rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <button
        role="button"
        aria-expanded={(showContent && active)}
        style={{ borderBottom: (showContent && active) ? 'solid 2px' : '0px' }}
        className={`flex w-full items-center justify-between rounded-[5px] border-black ${index % 2 ? "bg-dgreen" : "bg-dorange"}  p-5 font-bold`}
        onClick={() => {
          setShowContent(!showContent)
          setActive(index)
        }}
      >
        {question}
        <FiPlus
          style={{ transform: `rotate(${(showContent && active) ? '45deg' : '0'})` }}
          className="ml-4 min-h-[24px] min-w-[24px] transition-transform ease-in-out"
        />
      </button>
      <div
        ref={contentRef}
        style={{ height: (showContent && active) ? `${contentHeight}` : '0' }}
        className={`overflow-hidden rounded-b-[5px] h-fit w-full ${index % 2 ? "bg-dgreen" : "bg-dorange"} font-bold transition-[height] ease-in-out`}
      >
        {children}
      </div>
    </div>
  )
}
