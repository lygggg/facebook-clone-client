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
  const [isDuplicated, setIsDuplicated] = useState('');
  const [isSamePassword, setIsSamePassword] = useState('');
  const [joinFollowState, setJoinFollowState] = useState(false);
  const { temptJoiningId, temptJoiningPw, temptJoiningName } = temptState;
  const { users } = loginState;

  const setJoinTemptName = (temptJoiningName) => {
    setTemptState({ ...temptState, temptJoiningName });
  };
  const setJoinTemptId = (temptJoiningId) => {
    setTemptState({ ...temptState, temptJoiningId });
  };
  const setJoinTemptPw = (temptJoiningPw) => {
    setTemptState({ ...temptState, temptJoiningPw });
  };

  const checkDuplication = () => {
    for (let i = 0; i < users.length; i++) {
      if (temptJoiningId === users[i].id) {
        setIsDuplicated(true);
        return;
      }
    }
    
    setIsDuplicated(false);
  };

  const passwordCheck = (passwordForCheck) => {
    if (temptJoiningPw === passwordForCheck) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }
  }

  const handleMoveNext = async () => {
    if (isDuplicated !== false) {
      alert('아이디 중복을 확인해주세요');
      return;
    }
    
    if (isSamePassword !== true) {
      alert('비밀번호를 다시 확인해주세요');
      return;
    }

    if (!temptJoiningId.trim() || !temptJoiningPw.trim() || !temptJoiningName.trim()) {
      alert('모든 항목을 입력해주세요');
      return;
    }
    
    await addUser(temptJoiningId, temptJoiningPw, temptJoiningName);      
    setCurrentUserState({
      ...currentUserState,
      id: temptJoiningId,
      pw: temptJoiningPw,
      userName: temptJoiningName,
      friends: [],
    })
    setJoinFollowState(true);
  };

  if (joinFollowState === true) {
    return <Redirect to='joinfollow' />;
  }

  return (
    <>
      <h1>Facebook 회원가입 하기</h1>
      <div className="join-new">
        새로운 아이디 <input className="join-new-id" type="text" value={temptJoiningId} onChange={(e) => setJoinTemptId(e.target.value)} />
        <button type="button" onClick={checkDuplication}>중복 확인</button>
        {isDuplicated === true
        ? <div>해당 아이디는 이미 존재합니다</div>
        : isDuplicated === ''
          ? <div></div>
          : <div>사용하실 수 있는 아이디입니다</div>}
        <br />
        새로운 비밀번호 <input className="join-new-pw" type="password" onChange={(e) => setJoinTemptPw(e.target.value)} /> <br />
        비밀번호 확인 <input className="join-new-pw" type="password" onChange={(e) => passwordCheck(e.target.value)} /> <br />
        {isSamePassword
        ? <div>비밀번호가 일치합니다</div>
        : isSamePassword === ''
          ? <div></div>
          : <div>비밀번호가 일치하지 않습니다</div>}
        <br />
        이름 <input className="join-new-name" type="text" value={temptJoiningName} onChange={(e) => setJoinTemptName(e.target.value)} /> <br />
        <button className="join-new-button" type="button" onClick={handleMoveNext}>다음</button>
      </div>
    </>
  );
}

export default Join;
