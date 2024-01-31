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
    setChatHistory([...chatHistory, { text: inputText, sender: 'user' }]);
    setInputText('');

    fetch(`https://api.spoonacular.com/recipes/quickAnswer?q=${encodeURIComponent(inputText)}&apiKey=${api}`)
      .then((response) => response.json())
      .then((data) => {
        setChatHistory([...chatHistory, { text: data.answer, sender: 'bot' }]);
      })
      .catch((error) => {
        console.error('Error fetching chatbot answer:', error);
        setChatHistory([...chatHistory, { text: 'Error fetching chatbot answer', sender: 'bot' }]);
      });
  };

  return (
    <div className="cursor-pointer fixed bottom-10 right-10 bg-dgreen p-6 rounded-[50%] border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => setChatbotActive((prevState) => !prevState)}>
      <BsChatFill className="h-6 w-6 " color="black" />
      <Modal active={chatbotActive} setActive={setChatbotActive}>
        <div className="flex flex-col h-full justify-between">
          <div className="chat-history">
            {chatHistory.map((message, index) => (
              <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="flex-grow mr-2">
              <input
                className="rounded-md border-2 border-black p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none w-full"
                type="text"
                name="text"
                id="text"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value)
                }}
              />
            </div>
            <Button className="w-[10px]" onClick={handleSendMessage}>></Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chatbot;