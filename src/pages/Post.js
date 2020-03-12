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
  const { isLoggedIn } = loginState;
  const { id, friends } = currentUserState;
  const { post: posts } = postState;

  const appropriatePost = posts.filter(post =>
    post.id === id || friends.includes(post.id));

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
                />
              </div>
            ))}
          </div>
        </div>
        <div className="timeline-about-friends">
          <Link to="friendsreco">알 수도 있는 사람</Link>
        </div>
      </div>
    </>
  );
}

export default Post;
