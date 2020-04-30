import React from 'react';

function MyPageSide({
  currentUserState,
}) {
  return (
    <div className="mypage-side-banner">
      <div>
        <i className="fas fa-globe-americas"/>
        <span className="mypage-side-banner-introduce">소개</span>
        <div className="mypage-side-banner-utter">
          간단한 소개를 추가하여 회원님에 대해 자세히 알려주세요
        </div>
        <div className="mypage-user-information">
          <i className="fas fa-birthday-cake"/>
          <div>{currentUserState.birth}</div> <br />
          <i className="fas fa-map-marker-alt"/>
          <div>{currentUserState.location}</div> <br />
          <i className="far fa-envelope"/>
          <div>{currentUserState.email}</div>
        </div>
      </div>
    </div>
  );
}

export default MyPageSide;
