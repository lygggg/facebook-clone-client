import React, { useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowPost from '../components/posts/ShowPost';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';
import FriendsState from '../components/headers/FriendsState';
import SearchBox from '../components/headers/SearchBox';
import {checkSessionExist, getUsers} from '../function';
import PostEditBox from "../components/posts/PostEditBox";
import Comment from "../components/comments/Comment";

const callAPI = async (loginState, setLoginState, currentUserState, setCurrentUserState) => {
  const { user } = await checkSessionExist();
  const { userStore } = await getUsers();

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
  const { post } = postState;
  const { users } = loginState;
  const index = users.findIndex((user) => user.id === specificPost.id);

  useEffect(() => {
    callAPI(loginState, setLoginState, currentUserState, setCurrentUserState);
  }, []);

  return (
    <div className="mypage-grid">
      <div className="mypage-cover">
        <div className="mypage-cover-top">
          <img className="mypage-cover-profile-image" src={users[index].profile} />
          <span className="mypage-cover-username">{users[index].userName}</span>
        </div>
        <div className="mypage-cover-bottom">
          <button className="mypage-cover-word-timeline" type="button">타임라인</button>
          <button className="mypage-cover-word-information" type="button">정보</button>
          <button className="mypage-cover-word-friends" type="button">친구</button>
          <div>
            {specificPost.id === currentUserState.id
              ? (
                <Redirect to="/mypage" />
              )
              : (
                <FriendsState
                  specificPost={specificPost}
                  currentUserState={currentUserState}
                  setCurrentUserState={setCurrentUserState}
                  loginState={loginState}
                  setLoginState={setLoginState}
                />
              )}
          </div>
        </div>
      </div>
      <div className="header">
        <SearchBox
          loginState={loginState}
          setLoginState={setLoginState}
          setSearchState={setSearchState}
        />
        <HeaderOthersPage
          loginState={loginState}
          setLoginState={setLoginState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
        />
      </div>
      <div className="mypage-timeline-grid">
        <div className="mypage-side-banner">
          <div>
            <i className="fas fa-globe-americas"></i>
            <span className="mypage-side-banner-introduce">소개</span>
            <div className="mypage-side-banner-utter">
              _______________________________________________
            </div>
            <div className="mypage-user-information">
              <i className="fas fa-birthday-cake"></i>
              <div>{users[index].birth}</div> <br />
              <i className="fas fa-map-marker-alt"></i>
              <div>{users[index].location}</div> <br />
              <i className="far fa-envelope"></i>
              <div>{users[index].email}</div>
            </div>
          </div>
        </div>
        <div className="timeline-post">
          {post.filter((v) => v.id === specificPost.id).length === 0
            ? (
              <div className="showpost">
                <div className="no-post">게시글이 없습니다.</div>
              </div>
            )
            : post.filter((v) => v.id === specificPost.id).map((p, index) => (
              <div key={index}>
                <ShowPost
                  postState={postState}
                  setPostState={setPostState}
                  currentUserState={currentUserState}
                  commentState={commentState}
                  setCommentState={setCommentState}
                  p={p}
                  index={index}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default OthersPage;
