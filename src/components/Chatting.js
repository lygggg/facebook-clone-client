import React, { useState, useEffect } from 'react';

function Chatting({
  setIsChattingOn,
  currentUserState,
  socket,
  userSocketID,
  setUserSocketID,
}) {
  const [message, setMessage] = useState('');
  const [chattingMessages, setChattingMessages] = useState([]);

  useEffect(() => {
    socket.on('hello', (data) => {
      setChattingMessages((chattingMessages) => [...chattingMessages, `${data.userID} : ${data.message}`]);
    });
  }, []);

  const closeChatting = () => {
    setUserSocketID('');
    setIsChattingOn(false);
  };

  const getUserInputMessage = (contents) => {
    setMessage(contents);
  };

  const sendMessage = () => {
    const userID = currentUserState.id;

    socket.emit('chat message', { message, userSocketID, userID });
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
