import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import io from 'socket.io-client';
import Login from './pages/Login';
import Post from './pages/Post';
import MyPage from './pages/MyPage';
import OthersPage from './pages/OthersPage';
import Join from './pages/Join';
import FriendsReco from './pages/FriendsReco';
import JoinFollow from './pages/JoinFollow';
import JoinProfileImage from './pages/JoinProfileImage';
import Search from './pages/Search';

const socket = io.connect('https://woomin-facebook.herokuapp.com:11111');

const currentUser = {
  id: '',
  pw: '',
  userName: '',
  friends: [],
};

const initialLogin = {
  users: [],
  isLoggedIn: false,
};

const initialPost = {
  post: [],
  scrap: [],
};

const initialComment = {
  comment: [],
};

const initialSearch = {
  contents: [],
  exist: false,
}

function App() {
  const [topLevelState, setTopLevelState] = useState('');
  const [searchState, setSearchState] = useState(initialSearch);
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
            socket={socket}
          />
        </Route>
        <Route path="/join">
          <Join
            loginState={loginState}
            setLoginState={setLoginState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
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
            topLevelState={topLevelState}
            setTopLevelState={setTopLevelState}
            setSearchState={setSearchState}
            socket={socket}
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
            setSearchState={setSearchState}
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
            setSearchState={setSearchState}
          />
        </Route>
        <Route path="/friendsreco">
          <FriendsReco
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
            loginState={loginState}
            setLoginState={setLoginState}
            topLevelState={topLevelState}
            setTopLevelState={setTopLevelState}
            setSearchState={setSearchState}
          />
        </Route>
        <Route path="/joinfollow">
          <JoinFollow
            loginState={loginState}
            setLoginState={setLoginState}
            topLevelState={topLevelState}
            setTopLevelState={setTopLevelState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        </Route>
        <Route path="/joinprofileimage">
          <JoinProfileImage
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        </Route>
        <Route path="/search">
          <Search
            searchState={searchState}
            setSearchState={setSearchState}
            topLevelState={topLevelState}
            setTopLevelState={setTopLevelState}
            loginState={loginState}
            setLoginState={setLoginState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
