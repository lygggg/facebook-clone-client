import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import func from '../function';
import Header from '../web_components/Header';
import Advertisement from '../web_components/Advertisement';
import TimeLinePost from '../web_components/TimeLinePost';
import FriendsIndex from '../web_components/FriendsIndex';
import toTop from "../components/toTop";

const callAPI = async (postState, setPostState, loginState, setLoginState) => {
  toTop();
  const { timeLinePosts } = await func.getPosts();
  const { userStore } = await func.getUsers();

  setLoginState({ ...loginState, users: [...userStore] });

  setPostState({
    ...postState,
    post: [...timeLinePosts.reverse()],
  });
};

function Post({
  postState,
  setPostState,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
  commentState,
  setCommentState,
  topLevelState,
  setTopLevelState,
  setSearchState,
  socket,
}) {
  const { isLoggedIn, users } = loginState;
  const { id } = currentUserState;

  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    callAPI(postState, setPostState, loginState, setLoginState);
  }, []);

  return (
    <div>
      {!func.findUserById(users, id)
        ? <h2 className='loading'>페이지를 로딩중입니다...</h2>
        : (
          <div>
            <Header
              loginState={loginState}
              setLoginState={setLoginState}
              currentUserState={currentUserState}
              setCurrentUserState={setCurrentUserState}
              setSearchState={setSearchState}
            />
            <div className="main-timeline">
              <Advertisement />
              <TimeLinePost
                postState={postState}
                setPostState={setPostState}
                currentUserState={currentUserState}
                commentState={commentState}
                setCommentState={setCommentState}
                setTopLevelState={setTopLevelState}
                loginState={loginState}
                setLoginState={setLoginState}
              />
              <FriendsIndex
                loginState={loginState}
                currentUserState={currentUserState}
                topLevelState={topLevelState}
                setTopLevelState={setTopLevelState}
                socket={socket}
              />
            </div>
          </div>
        )}
    </div>
  );
}

export default Post;
