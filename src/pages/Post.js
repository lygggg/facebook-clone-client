import React, { useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import AddPost from '../components/posts/AddPost';
import ShowPostHome from '../components/posts/ShowPostHome';
import HeaderHome from '../components/headers/HeaderHome';
import SearchBox from '../components/headers/SearchBox';
import { getPosts } from '../function';

const callAPI = async (postState, setPostState) => {
  const { timeLinePosts } = await getPosts();

  setPostState({
    ...postState,
    post: [...timeLinePosts.reverse()],
  });
}

function Post({
  postState,
  setPostState,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
  commentState,
  setCommentState,
  setTopLevelState,
  setSearchState,
}) {
  const { isLoggedIn, users } = loginState;
  const { id, friends } = currentUserState;
  const { post: posts } = postState;

  const appropriatePost = posts.filter(post =>
    post.id === id || friends.includes(post.id));

  const findUserById = (userID) => {
    const index = users.findIndex(user => user.id === userID);
    return users[index];
  };

  useEffect(() => {
    callAPI(postState, setPostState);
  }, []);

  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
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
        <div>
          여기 광고
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
                />
              </div>
            ))}
          </div>
        </div>
        <div className="friends-index">
          <Link className="frineds-index-line-knowing" to="friendsreco">알 수도 있는 사람</Link>
          <div className="timeline-about-friends">
            <div className="friends-index-line-utter">친구 목록</div>
            <br />
            <div>
              {friends.map(v =>
                <div>
                  <img className="friends-index-line-profile" src={findUserById(v).profile} />
                  <span className="friends-index-line-name">{findUserById(v).userName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
