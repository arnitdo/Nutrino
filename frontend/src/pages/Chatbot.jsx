import React, {useState} from 'react';
import Button from '../components/Button';
import {BsChatFill} from 'react-icons/bs';
import Modal from '../components/Modal';
import store from '../lib/zustand';
import Input from "../components/Input.jsx";

const Chatbot = () => {
	const [chatbotActive, setChatbotActive] = useState(false);
	const [chatHistory, setChatHistory] = useState([]);
	const [inputText, setInputText] = useState('');
	const {api} = store()

	const handleSendMessage = () => {
		setInputText("")
		fetch(`https://api.spoonacular.com/recipes/quickAnswer?q=${encodeURIComponent(inputText)}&apiKey=${api}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.answer.trim().length == 0) return;
				setChatHistory((prevHist) => {
					return [
						...prevHist,
						{text: inputText, sender: 'user'},
						{text: data.answer, sender: 'bot'}
					]
				});
			})
			.catch((error) => {
				setChatHistory([...chatHistory, {text: 'Error fetching chatbot answer', sender: 'bot'}]);
			});
	};

	return (
		<div
			className="cursor-pointer fixed bottom-10 right-10 p-6 rounded-[50%] border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
			onClick={() => setChatbotActive((prevState) => !prevState)}>
			<BsChatFill className="h-6 w-6 "/>
			<Modal active={chatbotActive} setActive={setChatbotActive} title={"Nutrino ChatBot"}>
				<div className="flex flex-grow gap-4 pt-8 flex-col overflow-scroll justify-between">
					<div className={"h-[360px] flex flex-col gap-4 overflow-scroll"}>
						{chatHistory.map((message, index) => (
							<div
								key={index}
								className={`rounded p-2 ${message.sender === 'user' ? 'bg-lgreen' : 'bg-lorange'}`}
							>
								{message.text}
							</div>
						))}
					</div>
					<div className="flex flex-row justify-end items-center">
						<Input
							type="text"
							value={inputText}
							setValue={setInputText}
							placeholder="Type your message..."
							grow
						/>
						<Button onClick={handleSendMessage}>Send</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Chatbot;
