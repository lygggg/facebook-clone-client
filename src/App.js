import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Post from './pages/Post';
import MyPage from './pages/MyPage';
import OthersPage from './pages/OthersPage';
import Join from './pages/Join';

const currentUser = {
  id: '',
  pw: '',
  userName: '',
  friends: [],
};

const initialLogin = {
  isLoggedIn: false,
  users: [
    {
      id: 'a',
      pw: 'a',
      userName: '전우민',
      friends: ['qwertyuiop', 'ㅁ'],
    },
    {
      id: 'ㅁ',
      pw: 'ㅁ',
      userName: '박재선',
      friends: ['qwertyuiop', 'a'],
    },
  ],
};

const initialPost = {
  post: [
    {
      uniqueKey: 4231,
      id: 'qwertyuiop', // 이 게시글을 누가 썼는지 식별 userID == currentUser.id ?
      name: '이민석',
      contents: '여기는 게시글 내용이 작성되는 영역입니다. 위의 "게시글 만들기"에서 글을 입력하면 여기에 등록됩니다.', // 게시글의 내용
      thumbCount: [], // 좋아요 갯수
      sharingCount: 0, // 공유 횟수
      commentCount: 0, // 게시글의 댓글 갯수
      isEditButtonClicked: false, // 수정버튼이 눌렸는가?
    },
  ],
  scrap: [],
};

const initialComment = {
  comment: [],
};

function App() {
  const [topLevelState, setTopLevelState] = useState('');
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
            commentState={commentState}
            setCommentState={setCommentState}
            postState={postState}
            setPostState={setPostState}
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
            setTopLevelState={setTopLevelState}
          />
        </Route>
        <Route path="/mypage">
          <MyPage
            postState={postState}
            setPostState={setPostState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
            loginState={loginState}
            setLoginState={setLoginState}
            commentState={commentState}
            setCommentState={setCommentState}
            setTopLevelState={setTopLevelState}
          />
        </Route>
        <Route path="/otherspage">
          <OthersPage
            specificPost={topLevelState}
            loginState={loginState}
            setLoginState={setLoginState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
            postState={postState}
            setPostState={setPostState}
            commentState={commentState}
            setCommentState={setCommentState}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
