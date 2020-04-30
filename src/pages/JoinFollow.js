import React, { useState, useEffect } from 'react';
import func from '../function';
import Swal from "sweetalert2";

const setUserStatus = (setUsers, loginState) => {
  setUsers(
    loginState.users.map(user => ({
      ...user,
      checked: false,
    })),
  );
}

function JoinFollow({
  loginState,
  currentUserState,
}) {
  const [users, setUsers] = useState([]);
  const { id } = currentUserState;

  useEffect(() =>{
    setUserStatus(setUsers, loginState);
  }, []);

  const checkUser = (userID) => {
    setUsers(
      users.map(user =>
        user.id === userID
          ? {
            ...user,
            checked: !user.checked,
          }
          : user),
    );
  };

  const completeJoining = async () => {
    await Promise.all(
      users
        .filter((user) => user.checked)
        .map((user) => func.addFriend(id, user.id)),
    )

    await Swal.fire('회원가입 완료', '다시 로그인 해주세요', 'success');
    location.href = '/';
  };

  return (
    <>
      <div className="login-header">
        <span className="login-header-facebook">facebook 팔로우하기</span>
      </div>
      <div>
        <div className="join-following">
          {users.map((v, index) => (
            <div key={index}>
              <label className="join-users">
                <input type="checkbox" onChange={() => checkUser(v.id)} />
                <br />
                <img className="join-user-profile" src={v.profile} alt="" />
                <div className="join-users-informatrion">
                  <div className="join-users-name">{v.userName}</div>
                  <div className="join-users-lint">{v.birth}</div>
                  <div className="join-users-lint">{v.location}</div>
                  <div className="join-users-lint">{v.email}</div>
                </div>
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
