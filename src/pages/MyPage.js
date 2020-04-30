import React, { useEffect } from 'react';
import func from '../function';
import Header from '../web_components/Header';
import MyPageTop from '../web_components/MyPageTop';
import MyPageSide from '../web_components/MyPageSide';
import MyPagePost from '../web_components/MyPagePost';
import toTop from "../components/toTop";

const getPostDataFromServer = async (postState, setPostState, currentUserState, setCurrentUserState) => {
  toTop();

  const { user } = await func.checkSessionExist();
  const { timeLinePosts } = await func.getPosts();

  setCurrentUserState({
    ...currentUserState,
    id: user.id,
    userName: user.userName,
    friends: user.friends,
    profile: user.profile,
    birth: user.birth,
    location: user.location,
    email: user.email,
  });

  setPostState({
    ...postState,
    post: [...timeLinePosts.reverse()],
  });
};

function MyPage({
  postState,
  setPostState,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
  commentState,
  setCommentState,
  setSearchState,
}) {
  useEffect(() => {
    getPostDataFromServer(postState, setPostState, currentUserState, setCurrentUserState);
  }, []);

  return (
    <div className="mypage-grid">
      <MyPageTop
        currentUserState={currentUserState}
      />
      <Header
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
        setSearchState={setSearchState}
      />
      <div className="mypage-timeline-grid">
        <MyPageSide
          currentUserState={currentUserState}
        />
        <MyPagePost
          currentUserState={currentUserState}
          postState={postState}
          setPostState={setPostState}
          commentState={commentState}
          setCommentState={setCommentState}
          loginState={loginState}
          setLoginState={setLoginState}
        />
      </div>
    </div>
  );
}

export default MyPage;
