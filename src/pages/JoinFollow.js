import React, { useState, useEffect } from 'react';
import { addFriend, getUsers } from '../function';

const callAPI = async (setUsers, loginState, setLoginState) => {
  setUsers(
    loginState.users.map(user => ({
      ...user,
      checked: false,
    }))
  );
}

function JoinFollow({
  loginState,
  setLoginState,
  topLevelState,
  setTopLevelState,
  currentUserState,
  setCurrentUserState,
}) {
  const [users, setUsers] = useState([]);
  const { id } = currentUserState;

  useEffect(() =>{
    callAPI(setUsers, loginState, setLoginState);
  }, []);

  const checkUser = (userID) => {
    setUsers(
      users.map(user =>
        user.id === userID
        ? {
          ...user,
          checked: !user.checked,
        }
        : user
      )
    )
  };

  const completeJoining = async () => {
    await Promise.all(
      users
        .filter(user => user.checked)
        .map(user => addFriend(id, user.id))
    )

    alert('회원가입이 완료되었습니다! 다시 로그인 해주세요');
    location.href = '/';
  };

  return (
    <>
      <h1>Facebook 팔로우 하기</h1>
      <div className="joining-round">
        <div>
          {users.map((v, index) => (
            <div key={index}>
              <label>
                <input type="checkbox" onChange={() => checkUser(v.id)} /> {v.userName}
              </label>
              <br />
            </div>
          ))}
        </div>
        <button
          className="joining-complete"
          type="button"
          onClick={completeJoining}
        >
        회원가입 완료
        </button>
      </div>
    </>
  );
}

export default JoinFollow;
