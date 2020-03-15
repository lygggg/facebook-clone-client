import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';
import { checkSessionExist, getUsers } from '../function';
import SearchBox from '../components/headers/SearchBox';

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

  if (friends.length > 0 && users.length > 0) {
    // currentUser의 friends의 friends ID값을 friendsRecoArray 배열에 다 넣어줌
    for (let i = 0; i < friends.length; i++) {
      const index = users.findIndex(user => user.id === friends[i]);
      friendsRecoArray = [...friendsRecoArray, ...users[index].friends];
    }

    // 친구추천에서 중복되는 유저 제거
    friendsRecoArray.sort();
    for (let i = 0; i < friendsRecoArray.length; i += 1) {
      friendsRecoArray[i] === friendsRecoArray[i+1]
        ? friendsRecoArray[i] = '중복이므로 제거 대상'
        : '';
    }
    friendsRecoArray = friendsRecoArray.filter(v => v !== '중복이므로 제거 대상');

    // 친구추천에서 currentUser의 아이디는 지워줌
    friendsRecoArray.includes(currentUserState.id)
    && friendsRecoArray.splice(friendsRecoArray.indexOf(currentUserState.id), 1)

    // 친구추천에서 currentUser와 이미 친구인 사람은 지워줌
    for (let i = 0; i < friends.length; i += 1) {
      if (friendsRecoArray.includes(friends[i])) {
        friendsRecoArray.splice(friendsRecoArray.indexOf(friends[i]), 1);
      }
    }
  }

  // user의 id를 받아와서 topLevelState의 형식에 맞춰서 넣어줌
  const setUserToTopLevelByID = (id) => {
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
    <div>
      <>
        <div className="header">
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
        </div>
        <br />
        <br />
        <div className="maybe-you-know">알 수도 있는 사람</div>
        <div>
          <div className="join-following">
            {friendsRecoArray.map((v, index) => (
              <div key={index}>
                <label className="join-users">
                  <img className="join-user-profile" src={changeIdToUser(v, loginState).profile} alt="" />
                  <div className="join-users-informatrion">
                    <Link
                      to="/otherspage"
                      className="join-users-name"
                      type="button"
                      onClick={() => setUserToTopLevelByID(v)}
                    >
                      {changeIdToUser(v, loginState).userName}
                    </Link>
                    <div className="join-users-lint">{changeIdToUser(v, loginState).birth}</div>
                    <div className="join-users-lint">{changeIdToUser(v, loginState).location}</div>
                    <div className="join-users-lint">{changeIdToUser(v, loginState).email}</div>
                  </div>
                </label>
                <br />
              </div>
            ))}
          </div>
        </div>
      </>
      )}
    </div>
  );
}

export default FriendsReco;
