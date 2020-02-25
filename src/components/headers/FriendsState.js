import React, { useEffect } from 'react';
import { addFriend, removeFriend, getUsers } from '../../function';

const callAPI = async (
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
) => {
  const { userStore } = await getUsers();

  setLoginState({
    ...loginState,
    users: [...userStore.users],
  });

  setCurrentUserState({
    ...currentUserState,
    friends: 
  });
};

function FriendsState({
  specificPost,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
}) {
  const { id, name } = specificPost;
  const { friends } = currentUserState;

  useEffect(() => {
    callAPI(loginState, setLoginState);
  }, []);

  console.log('useEffect 무한루프 도는지 확인하는 console.log')
  
/*
지금 userStore.users를 friends에다가 저장하고 있는데 이러면 안되지;;
frineds에는 아이디값만 들어가야되는데 유저 전체를 넣고있잖아;; 이게
어떻게 지금까지 잘 돌아갔는지는 모르겠는데 이거 해결해야함
일단 loginState에 users[]가 있으니까 서버에서 받아온 값은 저기다가
저장하고, currentUser를 다시 갱신해주는 게 필요할 거같은데, 문제는
loginState에 있는 users 중에 어떤 애가 현재 유저냐는거지.
그러니까 users 객체 안에다가 current: false 라는 프로퍼티를 추가하고
만약 로그인되면 true로 바꾸고 로그아웃되면 false로 바꿔주는걸 구현
하고, loginState의 users 중 current 프로퍼티가 true인 애를 찾아서
걔를 currentUser로 할당해줘야 할 것 같음. 현재 currentUser를 너무 
광범위하게 써놔가지구 저걸 없애는건 무리. 알맞게 할당해줘야 함.   
*/
  const friendAddButtonClicked = async () => {
    const { userStore } = await addFriend(currentUserState.id, id);
    setCurrentUserState({ ...currentUserState, friends: [...userStore.users] });
  };

  const friendRemoveButtonClicked = async () => {
    const { userStore } = await removeFriend(currentUserState.id, id);
    setCurrentUserState({ ...currentUserState, friends: [...userStore.users] });
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
