import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AddPost from '../components/posts/AddPost';
import ShowPostHome from '../components/posts/ShowPostHome';
import HeaderHome from '../components/headers/HeaderHome';
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
}) {
  const { isLoggedIn } = loginState;
  const { id, friends } = currentUserState;
  const { post } = postState;
  let appropriatePost = [];

  useEffect(() => {
    callAPI(postState, setPostState);
  }, []);

  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  for (let i = 0; i < post.length; i += 1) {
    if (post[i].id === id) {
      appropriatePost.push(post[i]);
    }
    if (friends.includes(post[i].id)) {
      appropriatePost.push(post[i]);
    }
  }

  return (
    <>
      <HeaderHome
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
      <br />
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
    </>
  );
}

export default Post;
