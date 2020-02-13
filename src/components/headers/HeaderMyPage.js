/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Header({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const [timelinePageState, setTimelinePageState] = useState(false);
  const { isLoggedIn } = loginState;
  const { userName } = currentUserState;

  const moveToTimelinePage = () => {
    setTimelinePageState(true);
  };

  const logoutButtonClicked = () => {
    setLoginState({ ...loginState, isLoggedIn: false, temptId: '', temptPw: '' });
    setCurrentUserState({ ...currentUserState, id: '', pw: '', userName: '' });
    alert('로그아웃 되었습니다');
  };

  if (timelinePageState === true) {
    return <Redirect to="/post" />;
  }
  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Facebook</h1>
      <span>{userName}{' '}</span>
      <button className="page-header" type="button" onClick={moveToTimelinePage}>홈</button>{' '}
      <button className="page-header" type="button">마이페이지</button>{' '}
      <button className="page-header" type="button" onClick={logoutButtonClicked}>로그아웃</button>
      <br />
    </>
  );
}

export default Header;
