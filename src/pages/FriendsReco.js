import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';
import func from '../function';
import SearchBox from '../components/headers/SearchBox';
import toTop from "../components/toTop";

const getUserDataFromServer = async (loginState, setLoginState, currentUserState, setCurrentUserState) => {
  toTop();

  const { userStore } = await func.getUsers();
  const { user } = await func.checkSessionExist();

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
  const { friends } = currentUserState;
  const { users } = loginState;

  useEffect(() => {
    getUserDataFromServer(loginState, setLoginState, currentUserState, setCurrentUserState);
  }, []);

  if (friends.length > 0 && users.length > 0) {
    friends.forEach((_, i) => {
      const index = users.findIndex(user => user.id === friends[i]);
      friendsRecoArray = [...friendsRecoArray, ...users[index].friends];
    });

    friendsRecoArray = friendsRecoArray.sort().map((friend, i) => {
      return friend === friendsRecoArray[i + 1] ? false : friend;
    }).filter(friend => friend !== false);

    friendsRecoArray.includes(currentUserState.id)
    && friendsRecoArray.splice(friendsRecoArray.indexOf(currentUserState.id), 1)

    friends.forEach((friend, i) => {
      if (friendsRecoArray.includes(friend)) {
        friendsRecoArray.splice(friendsRecoArray.indexOf(friend), 1);
      }
    });
  }

  const setUserToTopLevelByID = (id) => {
    users.forEach(user => {
      if (id === user.id) {
        setTopLevelState({
          ...topLevelState,
          id: user.id,
          name: user.userName,
        });
      }
    });
  };

  const changeIdToUser = (id, loginState) => {
    const { users } = loginState;

    return users.find(user => user.id === id);
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
