import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addUser } from '../apis/service';

const initialTempt = {
  temptJoiningId: '',
  temptJoiningPw: '',
  temptJoiningName: '',
};

function Join({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const [temptState, setTemptState] = useState(initialTempt);
  const [joinFollowState, setJoinFollowState] = useState(false);
  const { temptJoiningId, temptJoiningPw, temptJoiningName } = temptState;

  const setJoinTemptName = (temptJoiningName) => {
    setTemptState({ ...temptState, temptJoiningName });
  };
  const setJoinTemptId = (temptJoiningId) => {
    setTemptState({ ...temptState, temptJoiningId });
  };
  const setJoinTemptPw = (temptJoiningPw) => {
    setTemptState({ ...temptState, temptJoiningPw });
  };

  const handleAddJoining = async () => {
    if (temptJoiningId.trim() && temptJoiningPw.trim() && temptJoiningName.trim()) {
      await addUser(temptJoiningId, temptJoiningPw, temptJoiningName);      
      setCurrentUserState({
        ...currentUserState,
        id: temptJoiningId,
        pw: temptJoiningPw,
        userName: temptJoiningName,
        friends: [],
      })
      setTemptState({ temptJoiningId: '', temptJoiningPw: '', temptJoiningName: '' });
      setJoinFollowState(true);
    } else {
      alert('모든 항목을 입력해주세요');
    }
  };

  if (joinFollowState === true) {
    return <Redirect to='joinfollow' />;
  }

  return (
    <>
      <h1>Facebook 회원가입 하기</h1>
      <div className="join-new">
        새로운 이름 <input className="join-new-name" type="text" value={temptJoiningName} onChange={(e) => setJoinTemptName(e.target.value)} /> <br />
        새로운 아이디 <input className="join-new-id" type="text" value={temptJoiningId} onChange={(e) => setJoinTemptId(e.target.value)} /> <br />
        새로운 비밀번호 <input className="join-new-pw" type="text" value={temptJoiningPw} onChange={(e) => setJoinTemptPw(e.target.value)} /> <br />
        <button className="join-new-button" type="button" onClick={handleAddJoining}>다음</button>
      </div>
    </>
  );
}

export default Join;
