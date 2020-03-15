import React, { useEffect } from 'react';
import { checkSessionExist, getPosts } from '../function';
import Header from '../web_components/Header';
import MyPageTop from '../web_components/MyPageTop';
import MyPageSide from '../web_components/MyPageSide';
import MyPagePost from '../web_components/MyPagePost';

const callAPI = async (postState, setPostState, currentUserState, setCurrentUserState) => {
  const { user } = await checkSessionExist();
  const { timeLinePosts } = await getPosts();

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
    callAPI(postState, setPostState, currentUserState, setCurrentUserState);
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
