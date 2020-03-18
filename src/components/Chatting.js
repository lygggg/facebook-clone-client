import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function Chatting({
  setIsChattingOn,
}) {
  const [message, setMessage] = useState('');
  const [chattingMessages, setChattingMessages] = useState([]);

  useEffect(() => {
    socket.on('hello', (data) => {
      setChattingMessages((chattingMessages) => [...chattingMessages, `상대: ${data}`]);
    });
  }, []);

  const closeChatting = () => {
    setIsChattingOn(false);
  };

  const getUserInputMessage = (contents) => {
    setMessage(contents);
  };

  const sendMessage = () => {
    const { id } = socket;

    socket.emit('chat message', { message, id });
    setChattingMessages([...chattingMessages, message]);
    setMessage('');
  };

  return (
    <div className="chatting">
      <button type="button" onClick={closeChatting}>닫기</button>
      <div>
        {chattingMessages.map((v, i) => <div key={i}>{v}</div>)}
      </div>
      <div className="chatting-input">
        <input type="text" value={message} onChange={(e) => getUserInputMessage(e.target.value)} />
        <button type="button" className="chatting-send-button" onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default Chatting;
