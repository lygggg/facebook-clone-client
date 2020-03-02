import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addUser } from '../apis/service';

const initialTempt = {
  temptJoiningId: '',
  temptJoiningPw: '',
  temptJoiningName: '',
};

const errors = {
  id: '',
  ps: '',
};

function Join({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const [temptState, setTemptState] = useState(initialTempt);
  const [errorState, setErrorState] = useState(errors);
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
        setErrorState({ ...errorState, id: '이미 존재하는 아이디입니다'});
        return;
      }
    }
    
    setErrorState({ ...errorState, id: '사용할 수 있습니다' });
  };

  const passwordCheck = (passwordForCheck) => {
    if (temptJoiningPw === passwordForCheck) {
      setErrorState({ ...errorState, pw: '비밀번호가 일치합니다' });
    } else {
      setErrorState({ ...errorState, pw: '비밀번호가 서로 일치하지 않습니다'});
    }
  }

  const handleMoveNext = async () => {
    if (errorState.id !== '사용할 수 있습니다') {
      alert('아이디 중복을 확인해주세요');
      return;
    }
    
    if (errorState.pw !== '비밀번호가 일치합니다') {
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
        새로운 아이디 <input className="join-new-id" type="text" onChange={(e) => setJoinTemptId(e.target.value)} />
        <button type="button" onClick={checkDuplication}>중복 확인</button> <br />
        {errorState.id}
        <br />
        새로운 비밀번호 <input className="join-new-pw" type="password" onChange={(e) => setJoinTemptPw(e.target.value)} /> <br />
        비밀번호 확인 <input className="join-new-pw" type="password" onChange={(e) => passwordCheck(e.target.value)} /> <br />
        {errorState.pw}
        <br />
        이름 <input className="join-new-name" type="text" onChange={(e) => setJoinTemptName(e.target.value)} /> <br />
        <button className="join-new-button" type="button" onClick={handleMoveNext}>다음</button>
      </div>
    </>
  );
}

export default Join;
