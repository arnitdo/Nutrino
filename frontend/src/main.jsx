import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Alert from './components/Alert.jsx'
import Chatbot from './pages/Chatbot.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Alert/>
    <Chatbot />
  </React.StrictMode>,
)
