import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { addUser, fileUpload, getUsers} from '../function';


const initialTempt = {
  temptJoiningId: '',
  temptJoiningPw: '',
  temptJoiningName: '',
  temptJoiningBirth: 'xxxx-xx-xx',
  temptJoiningLocation: '',
  temptJoiningEmail: '',
};

const errors = {
  id: '',
  ps: '',
};

const callAPI = async (loginState, setLoginState) => {
  const { userStore } = await getUsers();

  setLoginState({ ...loginState, users: [...userStore] });
};

function Join({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const [temptState, setTemptState] = useState(initialTempt);
  const [errorState, setErrorState] = useState(errors);
  const [joinProfileImage, setJoinProfileImageState] = useState(false);
  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  const { id } = currentUserState;
  const { users } = loginState;
  const {
    temptJoiningId,
    temptJoiningPw,
    temptJoiningName,
    temptJoiningBirth,
    temptJoiningLocation,
    temptJoiningEmail,
  } = temptState;

  useEffect(() => {
    callAPI(loginState, setLoginState);
  }, []);

  const setJoinTemptName = (temptJoiningName) => {
    setTemptState({ ...temptState, temptJoiningName });
  };
  const setJoinTemptId = (temptJoiningId) => {
    setTemptState({ ...temptState, temptJoiningId });
  };
  const setJoinTemptPw = (temptJoiningPw) => {
    setTemptState({ ...temptState, temptJoiningPw });
  };
  const setJoinTemptBirth = (temptJoiningBirth) => {
    setTemptState({ ...temptState, temptJoiningBirth });
  };
  const setJoinTemptLocation = (temptJoiningLocation) => {
    setTemptState({ ...temptState, temptJoiningLocation});
  };
  const setJoinTemptEmail = (temptJoiningEmail) => {
    setTemptState({ ...temptState, temptJoiningEmail});
  }


  const checkDuplication = () => {
    for (let i = 0; i < users.length; i++) {
      if (!temptJoiningId.trim()) {
        setErrorState({ ...errorState, id: '새로운 아이디를 입력해주세요' });
        return;
      }

      if (temptJoiningId === users[i].id) {
        setErrorState({ ...errorState, id: '이미 존재하는 아이디입니다' });
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
  };

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

    const { userStore } = await getUsers();

    setLoginState({ ...loginState, users: [...userStore] });

    await addUser(
      temptJoiningId,
      temptJoiningPw,
      temptJoiningName,
      temptJoiningBirth,
      temptJoiningLocation,
      temptJoiningEmail,
      uploadedFile.filePath,
    );
    setCurrentUserState({
      ...currentUserState,
      id: temptJoiningId,
      pw: temptJoiningName,
      userName: temptJoiningName,
      birth: temptJoiningBirth,
      location: temptJoiningLocation,
      email: temptJoiningEmail,
    });
    setJoinProfileImageState(true);
  };

  const onChange = async (e) => {
    await setFile(e.target.files[0]);
    const send = document.getElementById('send');
    send.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    const { fileName, filePath } = await fileUpload(formData);

    setUploadedFile({ fileName, filePath });
  };

  if (joinProfileImage === true) {
    return <Redirect to="/joinfollow" />;
  }

  return (
    <>
      <div className="login-header">
        <span className="login-header-facebook">facebook 가입하기</span>
      </div>
      <div className="join">
        <div>
          <span className="join-new-id">
            새로운 아이디
          </span>
          <input className="join-id-input" type="text" onChange={(e) => setJoinTemptId(e.target.value)} />
          <button className="join-id-check" type="button" onClick={checkDuplication}>중복 확인</button>
          <span className="join-id-check-statement">{errorState.id}</span>
        </div>
        <div>
          <span className="join-new-pw">
            새로운 비밀번호
          </span>
          <input className="join-pw-input" type="password" onChange={(e) => setJoinTemptPw(e.target.value)} />
          <br />
          <span className="join-new-pw-check">
            비밀번호 확인
          </span>
          <input className="join-pw-input-check" type="password" onChange={(e) => passwordCheck(e.target.value)} />
          <span className="join-pw-check-statement">{errorState.pw}</span>
        </div>
        <div>
          <span className="join-name">
            이름
          </span>
          <input className="join-name-input" type="text" onChange={(e) => setJoinTemptName(e.target.value)} />
        </div>
        <div>
          <span className="join-birth">
            생년월일
          </span>
          <input className="join-birth-input" type="text" value={temptJoiningBirth} onChange={(e) => setJoinTemptBirth(e.target.value)} />
        </div>
        <div>
          <span className="join-location">
            거주지
          </span>
          <input type="text" onChange={(e) => setJoinTemptLocation(e.target.value)} />
        </div>
        <div>
          <span className="join-email">
            이메일
          </span>
          <input type="email" onChange={(e) => setJoinTemptEmail(e.target.value)} />
        </div>
        <div>
          <div className="join-upload-profile-image">프로필 사진 추가</div>
          <form onSubmit={onSubmit}>
            <div>
              <label>
                <i className="far fa-image"></i>
                <input className="hidden" type="file" onChange={onChange} />
                <input className="hidden" value="" id="send" type="submit" />
              </label>
            </div>
            {uploadedFile ? (
              <div>
                <div>
                  <img style={{ width: '10%' }} src={uploadedFile.filePath} alt="" />
                </div>
              </div>
            ) : null}
          </form>
        </div>
        <button className="join-next-button" type="button" onClick={handleMoveNext}>다음</button>
      </div>
    </>
  );
}

export default Join;
