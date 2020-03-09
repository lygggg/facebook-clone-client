import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { destroySession } from '../../function';

function HomeHeader({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  const { userName, profile } = currentUserState;
  const history = useHistory();

  const moveToMyPage = () => {
    history.push('/mypage');
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
      <h1>Facebook</h1>
      <img style={{ width: '5%' }} src={profile} alt="" />
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
