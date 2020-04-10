import React from 'react';
import { useHistory } from 'react-router-dom';
import func from '../../function';

function HomeHeader({
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

  const moveToMyPage = () => {
    history.push('/mypage');
  };

  const logoutButtonClicked = async () => {
    await func.destroySession(currentUserState.id);
    setLoginState({ ...loginState, isLoggedIn: false, temptId: '', temptPw: '' });
    setCurrentUserState({ ...currentUserState, id: '', pw: '', userName: '', profile: '' });
    alert('로그아웃 되었습니다');
    history.push('/');
  };

  return (
    <>
      <img className="header-profile-image" src={profile} alt="" />
      <button className="header-user-name" onClick={moveToMyPage}>{userName}</button>
      <button className="header-home" type="button" onClick={moveToTimelinePage}>홈</button>{' '}
      <button className="header-home" type="button" onClick={logoutButtonClicked}>로그아웃</button>
      <br />
    </>
  );
}

export default HomeHeader;
