/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import ShowPost from '../components/posts/ShowPost';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';
import FriendsState from '../components/headers/FriendsState';

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
  const { id } = specificPost;
  const userId = currentUserState.id;

  return (
    <>
      <HeaderOthersPage
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
      {id === userId
        ? (
          <Redirect to="/mypage" />
        )
        : (
          <FriendsState
            specificPost={specificPost}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        )}
      <div>
        {post.filter((v) => v.id === specificPost.id).length === 0
          ? <div className="no-post">게시글이 없습니다</div>
          : post.filter((v) => v.id === specificPost.id).map((p, index) => (
            <div key={index}>
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
