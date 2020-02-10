/* eslint-disable no-alert */
/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { AddJoining } from './function';

function Join({ loginState, setLoginState }) {
  const { temptJoiningId, temptJoiningPw, temptJoiningName } = loginState;

  const setJoinTemptName = (temptJoiningName) => {
    setLoginState({ ...loginState, temptJoiningName });
  };
  const setJoinTemptId = (temptJoiningId) => {
    setLoginState({ ...loginState, temptJoiningId });
  };
  const setJoinTemptPw = (temptJoiningPw) => {
    setLoginState({ ...loginState, temptJoiningPw });
  };

  const handleAddJoining = () => {
    if (temptJoiningId.trim() && temptJoiningPw.trim() && temptJoiningName.trim()) {
      setLoginState({ ...AddJoining(loginState, temptJoiningId, temptJoiningPw, temptJoiningName), temptJoiningId: '', temptJoiningPw: '', temptJoiningName: '' });
      alert('회원가입이 완료되었습니다! 로그인을 해주세요');
    } else {
      alert('모든 항목을 입력해주세요');
    }
  };

  return (
    <div className="join-new">
      <div className="join-title">회원가입 하기</div>
      새로운 이름 <input className="join-new-name" type="text" value={temptJoiningName} onChange={(e) => setJoinTemptName(e.target.value)} /> <br />
      새로운 아이디 <input className="join-new-id" type="text" value={temptJoiningId} onChange={(e) => setJoinTemptId(e.target.value)} /> <br />
      새로운 비밀번호 <input className="join-new-pw" type="text" value={temptJoiningPw} onChange={(e) => setJoinTemptPw(e.target.value)} /> <br />
      <button className="join-new-button" type="button" onClick={handleAddJoining}>등록</button>
    </div>
  );
}

export default Join;
