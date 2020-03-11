import React from 'react';
import { useHistory } from 'react-router-dom';
import { destroySession } from '../../function';

function Header({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const { userName, profile } = currentUserState;
  const history = useHistory();

  const moveToTimelinePage = () => {
    history.push('/post');
  };

  const logoutButtonClicked = async () => {
    await destroySession();
    setLoginState({ ...loginState, isLoggedIn: false, temptId: '', temptPw: '' });
    setCurrentUserState({ ...currentUserState, id: '', pw: '', userName: '', profile: '' });
    alert('로그아웃 되었습니다');
    history.push('/');
  };

  return (
    <>
      <img style={{ width: '5%' }} src={profile} alt="" />
      <span>{userName}{' '}</span>
      <button className="page-header" type="button" onClick={moveToTimelinePage}>홈</button>{' '}
      <button className="page-header" type="button">마이페이지</button>{' '}
      <button className="page-header" type="button" onClick={logoutButtonClicked}>로그아웃</button>
      <br />
    </>
  );
}

export default Header;
