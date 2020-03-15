import React from 'react';

function OthersPageSide({
  loginState,
  specificPost,
}) {
  const { users } = loginState;
  const index = users.findIndex((user) => user.id === specificPost.id);

  return (
    <div className="mypage-side-banner">
      <div>
        <i className="fas fa-globe-americas" />
        <span className="mypage-side-banner-introduce">소개</span>
        <div className="mypage-side-banner-utter">
          _______________________________________________
        </div>
        <div className="mypage-user-information">
          <i className="fas fa-birthday-cake" />
          <div>{users[index].birth}</div>
          {' '}
          <br />
          <i className="fas fa-map-marker-alt" />
          <div>{users[index].location}</div>
          {' '}
          <br />
          <i className="far fa-envelope" />
          <div>{users[index].email}</div>
        </div>
      </div>
    </div>
  );
}

export default OthersPageSide;
