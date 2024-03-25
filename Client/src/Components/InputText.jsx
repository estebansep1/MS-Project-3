import React, { useState, useRef } from "react";

const styles = {
  button: {
    width: "10%",
    height: 50,
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#dc3545",
    borderWidth: 0,
    color: "#fff",
  },
  textarea: {
    width: "60%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    fontSize: 18,
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

export default function InputText({ addMessage }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  function addAMessage() {
    addMessage({
      message,
    });
    setMessage("");
    textareaRef.current.focus();
  }

  function handleKeyPress(keyEvent) {
    if (keyEvent.key === "Enter") {
      addAMessage();
      keyEvent.preventDefault();
    }
  }
  return (
    <div style={styles.textContainer}>
      <textarea
        ref={textareaRef}
        style={styles.textarea}
        rows={6}
        placeholder="Write something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      ></textarea>
      <button onClick={() => addAMessage()} style={styles.button}>
        ENTER
      </button>
    </div>
  );
}
