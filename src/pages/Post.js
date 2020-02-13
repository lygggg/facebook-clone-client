/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React from 'react';
import { Redirect } from 'react-router-dom';
import AddPost from '../components/posts/AddPost';
import ShowPostHome from '../components/posts/ShowPostHome';
import HeaderHome from '../components/headers/HeaderHome';

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
  const { post } = postState;

  if (isLoggedIn === false) {
    return <Redirect to="/" />;
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
        {post.map((p, index) => ( // 친구 게시글만 나오게 하려면 filter 이용
          <div>
            <ShowPostHome
              postState={postState}
              setPostState={setPostState}
              currentUserState={currentUserState}
              commentState={commentState}
              setCommentState={setCommentState}
              setTopLevelState={setTopLevelState}
              p={p}
              index={index}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Post;
