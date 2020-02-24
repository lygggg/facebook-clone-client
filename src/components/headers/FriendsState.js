import React from 'react';
import { addFriend, removeFriend } from '../../function';

function FriendsState({
  specificPost,
  currentUserState,
  setCurrentUserState,
}) {
  const { id, name } = specificPost;
  const { friends } = currentUserState;

  const friendAddButtonClicked = () => {
    setCurrentUserState(addFriend(currentUserState, id));
  };
  const friendRemoveButtonClicked = () => {
    setCurrentUserState(removeFriend(currentUserState, id));
  };

  return (
    <>
      <h3>{name} 님의 타임라인</h3>
      <div>
        {friends.includes(id)
          ? (
            <div className="other-friend-contents">
              <span>{name} 님과 친구입니다</span>{' '}
              <button
                className="others-friend-already"
                type="button"
                onClick={friendRemoveButtonClicked}
              >
              친구해제
              </button>
            </div>
          ) : (
            <button
              className="others-friend-add"
              type="button"
              onClick={friendAddButtonClicked}
            >
            친구추가
            </button>
          )}
      </div>
    </>
  );
}

export default FriendsState;
