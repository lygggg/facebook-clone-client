/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Join from './Join';

function Login({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const { users, temptId, temptPw, isLoggedIn } = loginState;

  const setLoginTemptId = (temptId) => {
    setLoginState({ ...loginState, temptId });
  };
  const setLoginTemptPw = (temptPw) => {
    setLoginState({ ...loginState, temptPw });
  };

  const loginButtonClicked = () => {
    for (let i = 0; i < users.length; i += 1) {
      if (temptId === users[i].id && temptPw === users[i].pw) {
        setCurrentUserState({ ...currentUserState, id: users[i].id, pw: users[i].pw, userName: users[i].userName });
        setLoginState({ ...loginState, isLoggedIn: true });
        alert('로그인 성공!');
      }
    }
  };

  if (isLoggedIn === true) {
    return <Redirect to="/post" />;
  }

  return (
    <>
      <h1>Facebook 로그인 하기</h1>
      <div className="login">
        아이디 <input type="text" className="login-id-box" onChange={(e) => setLoginTemptId(e.target.value)} /><br />
        비밀번호 <input type="text" className="login-pw-box" onChange={(e) => setLoginTemptPw(e.target.value)} /><br />
        <button onClick={loginButtonClicked} className="login-button" type="button">로그인</button>
      </div>
      <br />
      <br />
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
