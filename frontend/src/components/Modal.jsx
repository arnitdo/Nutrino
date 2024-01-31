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

	if (!active) return null

	return ReactDom.createPortal(
		<div
			role="dialog"
			aria-modal="true"
			style={{
				opacity: isVisible ? '1' : '0',
				visibility: isVisible ? 'visible' : 'hidden',
			}}
			className="fixed bottom-8 right-8 h-[440px] w-[330px] transition-all duration-300 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md"
		>
			<div className={"flex flex-grow flex-row space-between items-center"}>
				<div className={"font-bold"}>{title}</div>
				<button onClick={closeModal}>
					<MdClose className="absolute right-3 top-3 h-6 w-6"/>
				</button>
			</div>

		</div>,
		document.getElementById('modal'),
	)
}
