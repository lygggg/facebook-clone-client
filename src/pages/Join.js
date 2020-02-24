import React, { useState } from 'react';
import { addUser } from '../apis/service';

const initialTempt = {
  temptJoiningId: '',
  temptJoiningPw: '',
  temptJoiningName: '',
};

function Join({ loginState, setLoginState }) {
  const [temptState, setTemptState] = useState(initialTempt);
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
    await addUser(temptJoiningId, temptJoiningPw, temptJoiningName);

    if (temptJoiningId.trim() && temptJoiningPw.trim() && temptJoiningName.trim()) {
      setTemptState({ temptJoiningId: '', temptJoiningPw: '', temptJoiningName: '' });
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
