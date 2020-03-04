import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Join from './Join';
import { closeAllChildCommentBox } from '../function';
import { getUsers, performLogin } from '../apis/service';

const callAPI = async (currentUserState, setCurrentUserState, loginState, setLoginState) => {
  const { sending } = await performLogin();

  setCurrentUserState({
    ...currentUserState,
    id: sending[0],
    userName: sending[1],
    friends: sending[2],
  });
  setLoginState({ ...loginState, isLoggedIn: true });
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
  commentState,
  setCommentState,
  postState,
  setPostState,
}) {
  const [temptState, setTemptState] = useState(initialTempt);
  const [joiningPageState, setJoiningPageState] = useState(false);
  const { temptId, temptPw } = temptState;
  const { isLoggedIn, users } = loginState;

  useEffect(() => {
    callAPI(currentUserState, setCurrentUserState, loginState, setLoginState);
  }, []);

  const setLoginTemptId = (temptId) => {
    setTemptState({ ...temptState, temptId });
  };
  const setLoginTemptPw = (temptPw) => {
    setTemptState({ ...temptState, temptPw });
  };

  const loginButtonClicked = async () => {
    const { userInformation, state, redirect } = await performLogin(temptId, temptPw);

    if (state === 0) {
      alert('아이디와 비밀번호를 다시 확인해주세요');
      return;
    }

    setCurrentUserState({
      ...currentUserState,
      id: userInformation.id,
      userName: userInformation.userName,
      friends: userInformation.friends,
    });
    
    setLoginState({ ...loginState, isLoggedIn: true });
  };
  
  const MoveToJoiningPage = () => {
    setJoiningPageState(true);
  }

  if (joiningPageState === true) {
    return <Redirect to="/join" />;
  }

  if (isLoggedIn === true) {
    return <Redirect to="/post" />;
  }

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
