import React from 'react';
import { Redirect } from 'react-router-dom';
import FriendsState from '../components/headers/FriendsState';

function OthersPageTop({
  specificPost,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
}) {
  const { users } = loginState;
  const index = users.findIndex((user) => user.id === specificPost.id);

  return (
    <div className="mypage-cover">
      <div className="mypage-cover-top">
        <img className="mypage-cover-profile-image" src={users[index].profile} alt="" />
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
  );
}

export default OthersPageTop;
