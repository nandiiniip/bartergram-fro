import React, { useState, useEffect, useContext, useRef } from 'react';
import './ChatPage.css';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../utils/UserContext';
import axios from 'axios';
import baseUrl from '../../utils/urls';


const ChatPage = () => {
    const { authState } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [ws, setWs] = useState(null);
    const messageListRef = useRef(null); // useRef for the message list container
     const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productOwnerUsername = searchParams.get('username');


    useEffect(() => {
        const token = authState.token;
        const userId = authState.username;
        const wsUrl = `${baseUrl.replace('http', 'ws')}/ws/${userId}?token=${token}`;
        const newWs = new WebSocket(wsUrl);

        newWs.onopen = () => {
            console.log('WebSocket connected');
        };

        newWs.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
             setMessages((prevMessages) => [...prevMessages, {sender: productOwnerUsername , content: messageData.content }]);
             scrollToBottom()
         };


        newWs.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        newWs.onclose = () => {
            console.log('WebSocket disconnected');
        };

        setWs(newWs);
        // Cleanup function to close the WebSocket when the component unmounts
          return () => {
            if (newWs && newWs.readyState === WebSocket.OPEN) {
             newWs.close();
           }
           
         };
    }, [authState.token, authState.username]);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };


  const sendMessage = () => {
        if (newMessage.trim() && ws && ws.readyState === WebSocket.OPEN) {
          const message = {
              sender: authState.username,
              receiver: productOwnerUsername,
              content: newMessage
            };
          ws.send(JSON.stringify(message));
            setMessages((prevMessages) => [...prevMessages, {sender: authState.username , content: newMessage }]);
            setNewMessage('');
          scrollToBottom();

        }
    };


    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };


    return (
        <div className="chat-container">
            <div className="chat-header">
               <h2>Chat with {productOwnerUsername}</h2>
            </div>
            <div className="message-list" ref={messageListRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${
                            msg.sender === authState.username ? 'sent' : 'received'
                        }`}
                    >
                        <div className="message-sender">
                            {msg.sender}
                        </div>
                        <div className="message-content">
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="chat-input"
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default ChatPage;