/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Post from './Post';
import Join from './Join';

const currentUser = {
  id: '',
  pw: '',
  userName: '',
};

const initialLogin = {
  isLoggedIn: false,
  temptId: '',
  temptPw: '',
  temptJoiningId: '',
  temptJoiningPw: '',
  temptJoiningName: '',
  users: [{
    id: 'a',
    pw: 'a',
    userName: '전우민',
  }],
};

function Login() {
  const [loginState, setLoginState] = useState(initialLogin);
  const [currentUserState, setCurrentUserState] = useState(currentUser);
  const { users, temptId, temptPw } = loginState;

  const setLoginTemptId = (temptId) => {
    setLoginState({ ...loginState, temptId });
  };
  const setLoginTemptPw = (temptPw) => {
    setLoginState({ ...loginState, temptPw });
  };

  const loginButtonClicked = () => {
    for (let i = 0; i < users.length; i += 1) {
      if (temptId === users[i].id && temptPw === users[i].pw) {
        setLoginState({ ...loginState, isLoggedIn: true });
        setCurrentUserState({ ...currentUserState, id: users[i].id, pw: users[i].pw, userName: users[i].userName });
        alert('로그인 성공!');
      }
    }
  };

  if (loginState.isLoggedIn === true) {
    return <Post currentUserState={currentUserState} />;
  }
  return (
    <>
      <h1>Facebook 로그인 하기</h1>
      <div className="login">
        아이디 <input type="text" className="login-id-box" onChange={(e) => setLoginTemptId(e.target.value)} /><br />
        비밀번호 <input type="text" className="login-pw-box" onChange={(e) => setLoginTemptPw(e.target.value)} /><br />
        <button type="button" className="login-button" onClick={loginButtonClicked}>로그인</button>
      </div>
      <br />
      <br />
      <Router>
        <Link to="/join" className="join-router">회원이 아니신가요?</Link>
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
