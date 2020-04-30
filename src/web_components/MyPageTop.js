import React from 'react';

function MyPageTop({
  currentUserState,
}) {

  return (
    <div className="mypage-cover">
      <div className="mypage-cover-top">
        <img className="mypage-cover-profile-image" src={currentUserState.profile} alt="" />
        <span className="mypage-cover-username">{currentUserState.userName}</span>
      </div>
      <div className="mypage-cover-bottom">
        <button className="mypage-cover-word-timeline" type="button">타임라인</button>
        <button className="mypage-cover-word-information" type="button">정보</button>
        <button className="mypage-cover-word-friends" type="button">친구</button>
        <button className="mypage-cover-word-scrap" type="button">스크랩</button>
      </div>
    </div>
  );
}

export default MyPageTop;
