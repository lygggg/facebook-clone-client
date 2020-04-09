import React, { useState, useEffect } from 'react';
import { findUserById } from '../function';

function Chatting({
  setIsChattingOn,
  currentUserState,
  socket,
  userSocketID,
  setUserSocketID,
  loginState,
  friendID,
  setFriendID,
}) {
  const [message, setMessage] = useState('');
  const [chattingMessages, setChattingMessages] = useState([]);
  const { users } = loginState;

  useEffect(() => {
    socket.on('hello', (data) => {
      console.log('Message : ', data.message);
      setChattingMessages((chattingMessages) =>
        [...chattingMessages, { id: data.userID, msg: data.message }]);
    });
  }, []);

  const getUserInputMessage = (contents) => {
    setMessage(contents);
  };

  const sendMessage = () => {
    const userID = currentUserState.id;

    socket.emit('chat message', { message, userSocketID, userID });
    setChattingMessages([...chattingMessages, { id: currentUserState.id, msg: message }]);
    setMessage('');
  };

  const closeChatting = () => {
    setUserSocketID('');
    setFriendID('');
    setIsChattingOn(false);
  };

  return (
    <div className="chatting">
      <div className="chatting-header">
        {findUserById(users, friendID).userName}
        님 과의 채팅방입니다
      </div>
      <button className="chatting-exit" type="button" onClick={closeChatting}>X</button>
      <div>
        {chattingMessages.map((v, i) => (
          <div key={i}>
            <div className="chatting-message-body">
              <span className="chatting-partner-name">{findUserById(users, v.id).userName}</span>
              <span className="chatting-message">{v.msg}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chatting-input">
        <input type="text" value={message} onChange={(e) => getUserInputMessage(e.target.value)} />
        <button type="button" className="chatting-send-button" onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default Chatting;
