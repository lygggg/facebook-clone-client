/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import ShowPost from '../components/posts/ShowPost';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';

function OthersPage({
  specificPost,
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
  postState,
  setPostState,
  commentState,
  setCommentState,
}) {
  const { post } = postState;
  return (
    <>
      <HeaderOthersPage
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
      <h3>{specificPost.name} 님의 타임라인</h3>
      <div>
        {post.filter((v) => v.id === specificPost.id).map((p, index) => (
          <div>
            <ShowPost
              postState={postState}
              setPostState={setPostState}
              currentUserState={currentUserState}
              commentState={commentState}
              setCommentState={setCommentState}
              p={p}
              index={index}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default OthersPage;
