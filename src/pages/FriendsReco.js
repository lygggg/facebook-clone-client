import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';
import { checkSessionExist, getUsers } from '../function';
import SearchBox from "../components/headers/SearchBox";

const callAPI = async (loginState, setLoginState, currentUserState, setCurrentUserState) => {
  const { userStore } = await getUsers();
  const { user } = await checkSessionExist();

  setCurrentUserState({
    ...currentUserState,
    id: user.id,
    userName: user.userName,
    friends: user.friends,
    profile: user.profile,
  });

  setLoginState({
    ...loginState,
    users: [...userStore],
  });
};

function FriendsReco({
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
  topLevelState,
  setTopLevelState,
  setSearchState,
}) {
  let friendsRecoArray = [];
  const { friends, id } = currentUserState;
  const { users } = loginState;

  useEffect(() => {
    callAPI(loginState, setLoginState, currentUserState, setCurrentUserState);
  }, []);

  // currentUser의 friends의 friends ID값을 friendsRecoArray 배열에 다 넣어줌
  for (let i = 0; i < users.length; i += 1) {
    if (friends.includes(users[i].id)) {
      friendsRecoArray = [...friendsRecoArray, ...users[i].friends];
    }
  }

  // 친구추천에서 currentUser와 이미 친구인 사람은 지워줌
  for (let i = 0; i < friends.length; i += 1) {
    if (friendsRecoArray.includes(friends[i])) {
      friendsRecoArray.splice(friendsRecoArray.indexOf(friends[i]), 1);
    }
  }

  // 친구추천에서 currentUser의 아이디는 지워줌
  friendsRecoArray.includes(currentUserState.id)
  && friendsRecoArray.splice(friendsRecoArray.indexOf(currentUserState.id), 1)

  // 친구추천에서 중복되는 유저 제거
  friendsRecoArray.sort();
  for (let i = 0; i < friendsRecoArray.length; i += 1) {
    friendsRecoArray[i] === friendsRecoArray[i+1]
      ? friendsRecoArray[i] = '중복이므로 제거 대상'
      : '';
  }
  friendsRecoArray = friendsRecoArray.filter(v => v !== '중복이므로 제거 대상');

  // user의 id를 받아와서 topLevelState의 형식에 맞춰서 넣어줌
  const findUserById = (id) => {
    for (let i = 0; i < users.length; i += 1) {
      if (id === users[i].id) {
        setTopLevelState({
          ...topLevelState,
          id: users[i].id,
          name: users[i].userName,
        });
      }
    }
  };

  // users.id를 users.userName으로 변경해주는 함수
  const changeIdToUser = (id, loginState) => {
    const { users } = loginState;
    let user = '';

    for (let i = 0; i < users.length; i += 1) {
      if (id === users[i].id) {
        user = users[i];
      }
    }

    return user;
  };

  return (
    <>
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
      <br />
      <br />
      <br />
      <h3>알 수도 있는 사람</h3>
      <div>
        {friendsRecoArray.map((v, index) => (
          <div key={index}>
            <img style={{ width: '8%' }} src={changeIdToUser(v, loginState).profile} alt="" />
            <Link
              to="/otherspage"
              className="post-name"
              type="button"
              onClick={() => findUserById(v)}
            >
              {changeIdToUser(v, loginState).userName}
            </Link>
            <br />
            <span>{changeIdToUser(v, loginState).birth}</span> <br />
            <span>{changeIdToUser(v, loginState).location}</span> <br />
            <span>{changeIdToUser(v, loginState).email}</span> <br />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

export default FriendsReco;
