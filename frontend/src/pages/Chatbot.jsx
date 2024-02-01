import React, { useState } from 'react';
import Button from '../components/Button';
import { BsChatFill } from 'react-icons/bs';
import Modal from '../components/Modal';
import store from '../lib/zustand';

const Chatbot = () => {
  const [chatbotActive, setChatbotActive] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const { api } = store();


  const handleSendMessage = () => {
    setInputText('');

    fetch(`https://api.spoonacular.com/recipes/quickAnswer?q=${encodeURIComponent(inputText)}&apiKey=${api}`)
      .then((response) => response.json())
      .then((data) => {
        setChatHistory((chatHistory) => {
          return [
            ...chatHistory,
            { text: inputText, sender: 'user' },
            { text: data.answer, sender: 'bot' }
          ]
        });
      })
      .catch((error) => {
        console.error('Error fetching chatbot answer:', error);
      });
  };

  return (
    <div className="cursor-pointer fixed bottom-10 right-10 bg-dgreen p-6 rounded-[50%] border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => setChatbotActive((prevState) => !prevState)}>
      <BsChatFill className="h-6 w-6 " color="black" />
      <Modal active={chatbotActive} setActive={setChatbotActive}>
        <div className="h-[360px] flex flex-col h-full justify-between">
          <div className=" h-[360px] flex flex-col gap-4 overflow-x-clip overflow-y-scroll">
            {chatHistory.map((message, index) => (
              <div key={index} className={message.sender === 'user' ? ' rounded bg-lgreen p-2' : ' rounded bg-lorange p-2'}>
                {message.text}
              </div>
            ))}
          </div>
          <div className={"flex flex-row"}>
            <input
              className="rounded-md border-2 border-black p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none w-full"
              type="text"
              name="text"
              id="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value)
              }}
              placeholder='Type Here'
            />
            <Button className="w-[10px]" onClick={handleSendMessage}>Go</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chatbot;