import React, { useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import AddPost from '../components/posts/AddPost';
import ShowPostHome from '../components/posts/ShowPostHome';
import HeaderHome from '../components/headers/HeaderHome';
import SearchBox from '../components/headers/SearchBox';
import {getPosts, getUsers} from '../function';
import advertising1 from '../advertising.png';
import advertising2 from '../advertising2.png';

const callAPI = async (postState, setPostState, loginState, setLoginState) => {
  const { timeLinePosts } = await getPosts();
  const { userStore } = await getUsers();

  setLoginState({ ...loginState, users: [...userStore] });

  setPostState({
    ...postState,
    post: [...timeLinePosts.reverse()],
  });
};

function Post({
  postState,
  setPostState,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
  commentState,
  setCommentState,
  topLevelState,
  setTopLevelState,
  setSearchState,
}) {
  const { isLoggedIn, users } = loginState;
  const { id, friends } = currentUserState;
  const { post: posts } = postState;
  let friendsRecoArray = [];

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

    // 세 명만 출력
    friendsRecoArray = friendsRecoArray.slice(0, 3);
  }

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

  const appropriatePost = posts.filter(post =>
    post.id === id || friends.includes(post.id));

  const findUserById = (userID) => {
    const index = users.findIndex(user => user.id === userID);
    return users[index];
  };

  useEffect(() => {
    callAPI(postState, setPostState, loginState, setLoginState);
  }, []);

  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  const moveToOthersPage = (userID) => {
    const index = users.findIndex(user => user.id === userID);
    setTopLevelState({
      ...topLevelState,
      id: users[index].id,
      name: users[index].userName,
    });
  }

  return (
    <div>
      {!findUserById(id)
        ? <h3>페이지를 로딩중입니다...</h3>
        : (
          <div>
            <div className="header">
              <SearchBox
                loginState={loginState}
                setLoginState={setLoginState}
                setSearchState={setSearchState}
              />
              <HeaderHome
                loginState={loginState}
                setLoginState={setLoginState}
                currentUserState={currentUserState}
                setCurrentUserState={setCurrentUserState}
              />
            </div>
            <div className="main-timeline">
              <div className="advertising">
                <div className="advertising-sponsored">Sponsored</div>
                <a className="advertising-1" href="https://woogod.netlify.com/">
                  <img className="advertising1-image" src={advertising1} />
                  <div className="advertising-url">
                    programmer.co.kr
                  </div>
                  <div className="advertising-statement">
                    리액트 핵 선배들이 알려주는 실무 꿀팁 가득한 스터디!
                  </div>
                </a>
                <a className="advertising-2" href="https://woogod.netlify.com/">
                  <img className="advertising2-image" src={advertising2} />
                  <div className="advertising-url">
                    programmer.co.kr
                  </div>
                  <div className="advertising-statement">
                    2020 Dev Match
                  </div>
                </a>
              </div>
              <div className="timeline-post">
                <AddPost
                  currentUserState={currentUserState}
                  postState={postState}
                  setPostState={setPostState}
                />
                <div>
                  {appropriatePost.map((p, index) => (
                    <div key={index}>
                      <ShowPostHome
                        postState={postState}
                        setPostState={setPostState}
                        currentUserState={currentUserState}
                        commentState={commentState}
                        setCommentState={setCommentState}
                        setTopLevelState={setTopLevelState}
                        specificPost={p}
                        index={index}
                        loginState={loginState}
                        setLoginState={setLoginState}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="friends-index">
                <div className="frineds-index-line-knowing">
                  <Link className="frineds-index-maybe-knowing" to="friendsreco">알 수도 있는 사람</Link>
                  <div className="frineds-index-maybe-knowing-3man">
                    {friendsRecoArray.map((v, index) => (
                      <div key={index}>
                        <img className="friends-index-line-profile" src={changeIdToUser(v, loginState).profile} alt="" />
                        <Link
                          to="/otherspage"
                          className="friends-index-line-name"
                          type="button"
                          onClick={() => moveToOthersPage(v)}
                        >
                          {changeIdToUser(v, loginState).userName}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="timeline-about-friends">
                  <div className="friends-index-line-utter">친구 목록</div>
                  <br />
                  <div>
                    {friends.map((v, index) => (
                      <div key={index}>
                        <img className="friends-index-line-profile" src={findUserById(v).profile} />
                        <Link
                          to="/otherspage"
                          className="friends-index-line-name"
                          type="button"
                          onClick={() => moveToOthersPage(v)}
                        >
                          {findUserById(v).userName}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Post;
