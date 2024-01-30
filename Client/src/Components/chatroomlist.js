import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://127.0.0.1:4000"; // Your server endpoint
const socket = socketIOClient(ENDPOINT);

function ChatRoomList() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    socket.on('roomList', (updatedRooms) => {
      setRooms(updatedRooms);
    });

    return () => {
      socket.off('roomList');
    };
  }, []);

  const handleCreateRoom = () => {
    if (newRoomName) {
      socket.emit('createRoom', newRoomName);
      setNewRoomName('');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={newRoomName} 
        onChange={(e) => setNewRoomName(e.target.value)} 
        placeholder="New Room Name"
      />
      <button onClick={handleCreateRoom}>Create Room</button>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>{room}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoomList;
