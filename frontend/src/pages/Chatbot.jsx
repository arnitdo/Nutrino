import React, {useState} from 'react'
import Button from '../components/Button'
import { BsChatFill } from 'react-icons/bs'
import Modal from '../components/Modal'

const Chatbot = () => {
  const [chatbotActive, setChatbotActive] = useState(false)

  return (
    <div className='cursor-pointer fixed bottom-10 right-10 bg-dgreen p-6 rounded-[50%] border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' onClick={() => {
      setChatbotActive((prevState) => {return !prevState})
    } }>
      <BsChatFill className="h-6 w-6 " color='black'  />
      <Modal
        active={chatbotActive}
        setActive={setChatbotActive}
      >
        HELLOOOOOOOO
      </Modal>
    </div>
  )
}

export default Chatbot