import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';
import { changeIdToName, getUsers } from '../function';

const callAPI = async (loginState, setLoginState) => {
  const { userStore } = await getUsers();
  const { users } = loginState;

  setLoginState({
    ...loginState,
    users: [...userStore.users],
  });
};

function FriendsReco({
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
  topLevelState,
  setTopLevelState,
}) {
  let friendsRecoArray = [];
  const { friends, id } = currentUserState;
  const { users } = loginState;

  useEffect(() => {
    callAPI(loginState, setLoginState);
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
    : ''
  }
  friendsRecoArray = friendsRecoArray.filter(v => v != '중복이므로 제거 대상');

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

  return (
    <>
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
            <Link
              to="/otherspage"
              className="post-name"
              type="button"
              onClick={() => findUserById(v)}
            >
              {changeIdToName(v, loginState)}
            </Link>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

export default FriendsReco;
