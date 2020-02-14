/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';

function FriendsReco({
  currentUserState,
  loginState,
  setLoginState,
  setCurrentUserState,
  topLevelState,
  setTopLevelState,
}) {
  let friendsRecommendationArray = [];
  const { friends, id } = currentUserState;
  const { users } = loginState;

  // currentUser의 friends의 friends ID값을 friendsRecommendationArray 배열에 다 넣어줌
  for (let i = 0; i < friends.length; i += 1) {
    for (let j = 0; j < users.length; j += 1) {
      if (friends[i] === users[j].id) {
        friendsRecommendationArray = [...friendsRecommendationArray, ...users[j].friends];
      }
    }
  }

  // 친구추천에서 currentUser의 아이디는 지워줌
  friendsRecommendationArray.splice(friendsRecommendationArray.indexOf(id), 1);

  // users.id를 users.userName으로 변경
  const changeIdToName = (id) => {
    let returnName = '';

    for (let i = 0; i < users.length; i += 1) {
      if (id === users[i].id) {
        returnName = users[i].userName;
      }
    }

    return returnName;
  };

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
        {friendsRecommendationArray.map((v) => (
          <Link
            to="/otherspage"
            className="post-name"
            type="button"
            onClick={() => findUserById(v)}
          >
            {changeIdToName(v)}
          </Link>
        ))}
      </div>
    </>
  );
}

export default FriendsReco;
