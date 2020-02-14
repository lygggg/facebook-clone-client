/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

function HomeHeader({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const [myPageState, setMyPageState] = useState(false);
  const { isLoggedIn } = loginState;
  const { userName } = currentUserState;

  const moveToMyPage = () => {
    setMyPageState(true);
  };

  const logoutButtonClicked = () => {
    setLoginState({ ...loginState, isLoggedIn: false, temptId: '', temptPw: '' });
    setCurrentUserState({ ...currentUserState, id: '', pw: '', userName: '' });
    alert('로그아웃 되었습니다');
  };

  if (myPageState === true) {
    return <Redirect to="/mypage" />;
  }
  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Facebook</h1>
      <span>{userName}{' '}</span>
      <button className="page-header" type="button">홈</button>{' '}
      <button className="page-header" type="button" onClick={moveToMyPage}>마이페이지</button>{' '}
      <button className="page-header" type="button" onClick={logoutButtonClicked}>로그아웃</button>
      <Link className="friends-recommendation" to="friendsreco">알 수도 있는 사람</Link>
      <br />
    </>
  );
}

export default HomeHeader;
