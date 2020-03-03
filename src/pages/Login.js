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
import { getUsers } from '../apis/service';

const callAPI = async (loginState, setLoginState) => {
  const { userStore, session } = await getUsers();
  setLoginState({ ...loginState, users: [...userStore.users] });
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
    callAPI(loginState, setLoginState);
  }, []);

  const setLoginTemptId = (temptId) => {
    setTemptState({ ...temptState, temptId });
  };
  const setLoginTemptPw = (temptPw) => {
    setTemptState({ ...temptState, temptPw });
  };

  // 로그인 버튼이 눌리면, temptId와 temptPw가 users와 일치하는지
  // 확인하고, 일치하면, users[i].id,pw,userName,friends를 서버에
  // currentUserStore에다가 저장한다. 그리고 이 값을 
  // setCurrentUserState 해가지구 다시 클라이언트에도 저장한다.
  // 만약 다시 들어오면, 세션ID를 확인해서 일치하면 서버에있는
  // currentUserStore에서 일치하는 세션ID를 찾아서 이 userID를
  // 클라이언트에 다시 송신해준 후 /post로 리다이렉트 시켜준다. 
  // 일치하지 않으면 로그인 화면에서 로그인 해야지 뭐. 아무것도
  // 안하면 될듯.
  const loginButtonClicked = () => {
    for (let i = 0; i < users.length; i += 1) {
      if (temptId === users[i].id && temptPw === users[i].pw) {
        setCurrentUserState({
          ...currentUserState,
          id: users[i].id,
          pw: users[i].pw,
          userName: users[i].userName,
          friends: users[i].friends,
        });
        setLoginState({ ...loginState, isLoggedIn: true });
        return;
      }
    }

    alert('아이디 혹은 비밀번호가 올바르지 않습니다');
  };
  
  const MoveToJoiningPage = () => {
    setJoiningPageState(true);
  }

  if (joiningPageState === true) {
    return <Redirect to="/join" />;
  }

  if (isLoggedIn === true) {
    alert('로그인 성공!');
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
