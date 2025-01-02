import React, { useState, useEffect, useContext, useRef } from 'react';
import './ChatPage.css';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../utils/UserContext';
import axios from 'axios';
import baseUrl from '../../utils/urls';
import { Navbar } from '../../components';

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
        const fetchChatHistory = async () => {
            try {
              const response = await axios.get(
                `${baseUrl}/chat-history/${authState.username}/${productOwnerUsername}`,
                {
                  headers: { 
                    Authorization: `Bearer ${authState.token}` 
                  }
                }
              );
          
              const fetchedMessages = response.data.map((msg) => {
                // First convert UTC string to Date object
                const utcDate = new Date(msg.timestamp);
                
                // Check if date is valid
                if (isNaN(utcDate)) {
                  console.error('Invalid date format:', msg.timestamp);
                  return {
                    ...msg,
                    timestamp: msg.timestamp // Return original timestamp if invalid
                  };
                }
          
                // Convert UTC to IST by adding 5 hours and 30 minutes
                const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
                
                // Format date as dd/mm/yyyy
                const day = istDate.getDate().toString().padStart(2, '0');
                const month = (istDate.getMonth() + 1).toString().padStart(2, '0');
                const year = istDate.getFullYear();
                
                // Format time as hh:mm am/pm
                const timeOptions = {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                };
                const timeString = istDate.toLocaleString('en-US', timeOptions).toLowerCase();
          
                // Combine date and time in desired format
                const formattedTimestamp = `${day}/${month}/${year} ${timeString}`;
          
                return {
                  sender: msg.sender,
                  content: msg.content,
                  timestamp: formattedTimestamp
                };
              });
          
              setMessages(fetchedMessages);
              scrollToBottom();
            } catch (error) {
              console.error('Failed to fetch chat history:', error);
            }
          };
          
        fetchChatHistory();

        const token = authState.token;
        const userId = authState.username;
        const wsUrl = `${baseUrl.replace('http', 'ws')}/ws/${userId}?token=${token}`;
        const newWs = new WebSocket(wsUrl);

        newWs.onopen = () => {
            console.log('WebSocket connected');
        };

        newWs.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            // Format incoming message timestamp to IST
            const date = new Date(messageData.timestamp); // Use the timestamp from the backend
            const options = {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            };

            const timestamp = new Intl.DateTimeFormat('en-IN', options).format(date);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: productOwnerUsername,
                    content: messageData.content,
                    timestamp,
                }
            ]);
            scrollToBottom();
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
    }, [authState.token, authState.username, productOwnerUsername]);

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
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: authState.username,
                    content: newMessage,
                    timestamp: new Date().toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                    }) // Convert the message timestamp to IST
                }
            ]);
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
        <div className="chat__main">
            <Navbar />
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
                            <div className="message-sender">{msg.sender}</div>
                            <div className="message-content">{msg.content}</div>
                            <div className="message-timestamp">{msg.timestamp}</div>
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
                    <button onClick={sendMessage} className="send-button">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
