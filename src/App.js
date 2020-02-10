import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './Login';
import Join from './Join';
import Post from './Post';

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

const initialPost = {
  temptContents: '',
  post: [
    {
      name: '낯선이',
      contents: '여기는 게시글 내용이 작성되는 영역입니다. 위의 "게시글 만들기"에서 글을 입력하면 여기에 등록됩니다.', // 게시글의 내용
      thumbCount: [], // 좋아요 갯수
      sharingCount: 0, // 공유 횟수
      commentCount: 0, // 게시글의 댓글 갯수
    },
  ],
};

const initialComment = {
  temptStatement: '',
  comment: [],
};

function App() {
  const [loginState, setLoginState] = useState(initialLogin);
  const [currentUserState, setCurrentUserState] = useState(currentUser);
  const [postState, setPostState] = useState(initialPost);
  const [commentState, setCommentState] = useState(initialComment);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login
            loginState={loginState}
            setLoginState={setLoginState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        </Route>
        <Route path="/join">
          <Join
            loginState={loginState}
            setLoginState={setLoginState}
          />
        </Route>
        <Route path="/post">
          <Post
            postState={postState}
            setPostState={setPostState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
            loginState={loginState}
            setLoginState={setLoginState}
            commentState={commentState}
            setCommentState={setCommentState}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
