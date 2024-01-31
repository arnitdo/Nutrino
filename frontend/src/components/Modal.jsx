import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom'
import {MdClose} from 'react-icons/md'

export default function Modal({active, setActive, children, title}) {
	const [isVisible, setIsVisible] = useState(false)

	const closeModal = () => {
		setIsVisible(false)
		setTimeout(() => {
			setActive(false)
		}, 300)
	}

  useEffect(() => {
    if (active) {
      setIsVisible(true)
    }
  }, [active])
  return ReactDom.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed bottom-8 right-8 h-[440px] flex w-[330px] flex-col justify-center items-center"
	  style={{
		  pointerEvents: isVisible ? "auto" : "none"
	  }}
    >
      <div
        style={{
          opacity: isVisible ? '1' : '0',
          visibility: isVisible ? 'visible' : 'hidden',
        }}
        className="w-[360px] flex-grow flex flex-col items-center justify-center rounded-md border-2 border-black bg-white p-10 pt-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
      >
        <button onClick={closeModal}>
          <MdClose className="absolute right-3 top-3 h-6 w-6 bg-dgreen" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal') ,
  )
}
