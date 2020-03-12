import React, { useEffect } from 'react';
import { addFriend, removeFriend } from '../../function';

const callAPI = async (loginState, setLoginState, currentUserState, setCurrentUserState) => {
  const { users } = loginState;

  users.forEach((user, i) => {
    currentUserState.id === users[i].id
      ? setCurrentUserState({
        ...currentUserState,
        friends: users[i].friends,
      })
      : user;
  });
}

function FriendsState({
  specificPost,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
}) {
  const { id, name } = specificPost;
  const { friends } = currentUserState;
  const { users } = loginState;

  useEffect(() => {
    callAPI(loginState, setLoginState, currentUserState, setCurrentUserState);
  }, [loginState]);

  const friendAddButtonClicked = async () => {
    const { userStore } = await addFriend(currentUserState.id, id);

    setLoginState({ ...loginState, users: [...userStore] });

    users.forEach((user, i) => {
      currentUserState.id === users[i].id
        ? setCurrentUserState({
          ...currentUserState,
          friends: users[i].friends,
        })
        : user;
    });
  };

  const friendRemoveButtonClicked = async () => {
    const { userStore } = await removeFriend(currentUserState.id, id);

    setLoginState({ ...loginState, users: [...userStore] });

    users.forEach((user, i) => {
      currentUserState.id === users[i].id
        ? setCurrentUserState({
          ...currentUserState,
          friends: users[i].friends,
        })
        : user;
    });
  };

  return (
    <>
      <h3>{name} 님의 타임라인</h3>
      <div>
        {friends.includes(id)
          ? (
            <div>
              <span className="others-friend-state">{name} 님과 친구입니다</span>{' '}
              <button
                className="others-friend-already"
                type="button"
                onClick={friendRemoveButtonClicked}
              >
              팔로우 해제
              </button>
            </div>
          ) : (
            <button
              className="others-friend-add"
              type="button"
              onClick={friendAddButtonClicked}
            >
            팔로우
            </button>
          )}
      </div>
    </>
  );
}

export default FriendsState;
