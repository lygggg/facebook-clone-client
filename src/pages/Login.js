import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import Join from './Join';
import {
  login,
  checkSessionExist,
  getUsers,
} from '../function';

const callAPI = async (currentUserState, setCurrentUserState, loginState, setLoginState, history) => {
  const { user } = await checkSessionExist();
  const { userStore } = await getUsers();

  setCurrentUserState({
    ...currentUserState,
    id: user.id,
    userName: user.userName,
    friends: user.friends,
    profile: user.profile,
  });
  setLoginState({ ...loginState, users: [...userStore], isLoggedIn: true })

  if (user) {
    history.push('/post');
  }
};

const initialTempt = {
  temptId: '',
  temptPw: '',
};

function Login({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const [temptState, setTemptState] = useState(initialTempt);
  const { temptId, temptPw } = temptState;
  const history = useHistory();

  useEffect(() => {
    callAPI(currentUserState, setCurrentUserState, loginState, setLoginState, history);
  }, []);

  const setLoginTemptId = (temptId) => {
    setTemptState({ ...temptState, temptId });
  };
  const setLoginTemptPw = (temptPw) => {
    setTemptState({ ...temptState, temptPw });
  };

  const loginButtonClicked = async () => {
    const { user, status } = await login(temptId, temptPw);

    if (status === 400) {
      alert('아이디와 비밀번호를 다시 확인해주세요');
      return;
    }

    setCurrentUserState({
      ...currentUserState,
      id: user.id,
      userName: user.userName,
      friends: user.friends,
      profile: user.profile,
    });

    setLoginState({ ...loginState, isLoggedIn: true });
    history.push('/post');
  };

  const MoveToJoiningPage = () => {
    history.push('/join');
  };

  return (
    <>
      <h1>Facebook 로그인 하기</h1>
      <div className="login">
        아이디 <input type="text" className="login-id-box" onChange={(e) => setLoginTemptId(e.target.value)} /><br />
        비밀번호 <input type="password" className="login-pw-box" onChange={(e) => setLoginTemptPw(e.target.value)} /><br />
        <button onClick={loginButtonClicked} className="login-button" type="button">로그인</button>
      </div>
      <br /><br /><br /><br />
      <Router>
        <button
          to="/join"
          className="join-router"
          onClick={MoveToJoiningPage}
        >
        회원이 아니신가요?
        </button>
        <Switch>
          <Route path="/join">
            <Join
              loginState={loginState}
              setLoginState={setLoginState}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Login;
