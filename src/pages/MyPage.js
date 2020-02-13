/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import AddPost from '../components/posts/AddPost';
import ShowPost from '../components/posts/ShowPost';
import Scrap from '../components/posts/Scrap';
import HeaderMyPage from '../components/headers/HeaderMyPage';

function MyPage({
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
  const { id } = currentUserState;
  const { post } = postState;

  return (
    <>
      <HeaderMyPage
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
        {post.filter((v) => v.id === id).map((p, index) => (
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
      <Scrap
        postState={postState}
        currentUserState={currentUserState}
        setTopLevelState={setTopLevelState}
      />
    </>
  );
}

export default MyPage;
