import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesRef = useRef();

  const socket = io('http://localhost:5001', {
  transports: ['websocket'],
})

  console.log('WebSocket Connection: ', socket);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

    socket.on('Chat Message', (msg) => {
        console.log('Received message:', msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
        socket.disconnect();
    };
}, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      socket.emit('Chat Message', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
      <ul ref={messagesRef} style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={index} style={{ padding: '0.5rem 1rem', backgroundColor: index % 2 === 0 ? '#efefef' : 'inherit' }}>
            {msg}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '0.25rem', position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', height: '3rem', boxSizing: 'border-box', backdropFilter: 'blur(10px)' }}>
        <input
          type="text"
          id="input"
          autoComplete="off"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={{ border: 'none', padding: '0 1rem', flexGrow: 1, borderRadius: '2rem', margin: '0.25rem', outline: 'none' }}
        />
        <button type="submit" style={{ background: '#333', border: 'none', padding: '0 1rem', margin: '0.25rem', borderRadius: '3px', outline: 'none', color: '#fff' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
