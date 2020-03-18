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
import background from '../login-background.png';

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
  socket,
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
    const { user, status } = await login(temptId, temptPw, socket.id);

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
      <div className="login-header">
        <span className="login-header-facebook">facebook</span>
        <div className="login-id">
          <div className="id-utter">아이디</div>
          <input type="text" className="login-id-box" onChange={(e) => setLoginTemptId(e.target.value)} />
        </div>
        <div className="login-pw">
          <div className="pw-utter">비밀번호</div>
          <input type="password" className="login-pw-box" onChange={(e) => setLoginTemptPw(e.target.value)} />
        </div>
        <div className="login-enter">
          <button onClick={loginButtonClicked} className="login-button" type="button">로그인</button>
        </div>
      </div>
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
      <div className="login-backgrond-utter">
        Facebook에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를 나눠 보세요
      </div>
      <img className="login-backgrond-image" src={background} />
    </>
  );
}

export default Login;
