import React, { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever from "./ChatBox"; // Import only what you need
import { ChatBoxSender } from "./ChatBox"; // Import only what you need
import InputText from "./InputText";
import UserLogin from "./UserLogin";

export default function ChatContainer() {
  let socketio = socketIOClient("http://localhost:5001");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [pass, setPass] = useState(localStorage.getItem("pass"));
  const avatar = localStorage.getItem("avatar");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    socketio.on("chat", (senderChats) => {
      setChats(senderChats);
    });
  }, [socketio]);

  function sendChatToSocket(chat) {
    socketio.emit("chat", chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user: localStorage.getItem("user"), avatar };
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("pass");
    localStorage.removeItem("avatar");
    setUser("");
  }

  function ChatsList() {
    return (
      <div style={{ height: "75vh", overflow: "scroll", overflowX: "hidden" }}>
        {chats.map((chat, index) => {
          if (chat.user === user)
            return (
              <ChatBoxSender
                key={index}
                message={chat.message}
                avatar={chat.avatar}
                user={chat.user}
              />
            );
          return (
            <ChatBoxReciever
              key={index}
              message={chat.message}
              avatar={chat.avatar}
              user={chat.user}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>Username: {user}</h4>
            <p
              onClick={() => logout()}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Log Out
            </p>
          </div>
          <ChatsList />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}

      <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
        <small
          style={{ backgroundColor: "lightblue", padding: 5, borderRadius: 5 }}
        >
          *Please note this application is still under the {" "}
          <strong>DEVELOPMENT</strong> stage!
        </small>
      </div>
    </div>
  );
}
