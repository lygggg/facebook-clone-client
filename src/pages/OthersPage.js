import React, { useEffect } from 'react';
import func from '../function';
import OthersPageTop from "../web_components/OthersPageTop";
import Header from "../web_components/Header";
import OthersPageSide from "../web_components/OthersPageSide";
import OthersPagePost from "../web_components/OthersPagePost";

const callAPI = async (loginState, setLoginState, currentUserState, setCurrentUserState) => {
  const { user } = await func.checkSessionExist();
  const { userStore } = await func.getUsers();

  setLoginState({
    ...loginState,
    users: [...userStore],
  });

  setCurrentUserState({
    ...currentUserState,
    id: user.id,
    userName: user.userName,
    friends: user.friends,
    profile: user.profile,
  });
};

function OthersPage({
  specificPost,
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
  postState,
  setPostState,
  commentState,
  setCommentState,
  setSearchState,
}) {
  const { users } = loginState;
  const index = users.findIndex((user) => user.id === specificPost.id);

  useEffect(() => {
    callAPI(loginState, setLoginState, currentUserState, setCurrentUserState);
  }, []);

  return (
    <div>
      {!users[index]
        ? <h3>서버로부터 데이터를 받아올 수 없습니다. 다시 로그인 해주세요.</h3>
        : (
          <div className="mypage-grid">
            <OthersPageTop
              specificPost={specificPost}
              currentUserState={currentUserState}
              setCurrentUserState={setCurrentUserState}
              loginState={loginState}
              setLoginState={setLoginState}
            />
            <Header
              loginState={loginState}
              setLoginState={setLoginState}
              currentUserState={currentUserState}
              setCurrentUserState={setCurrentUserState}
              setSearchState={setSearchState}
            />
            <div className="mypage-timeline-grid">
              <OthersPageSide
                loginState={loginState}
                specificPost={specificPost}
              />
              <OthersPagePost
                postState={postState}
                setPostState={setPostState}
                currentUserState={currentUserState}
                commentState={commentState}
                setCommentState={setCommentState}
                loginState={loginState}
                setLoginState={setLoginState}
                specificPost={specificPost}
              />
            </div>
          </div>
        )}
    </div>
  );
}

export default OthersPage;
