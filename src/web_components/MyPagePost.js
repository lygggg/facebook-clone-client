import React from 'react';
import AddPost from '../components/posts/AddPost';
import ShowPostOthersPage from '../components/posts/ShowPost';

function MyPagePost({
  currentUserState,
  postState,
  setPostState,
  commentState,
  setCommentState,
  loginState,
  setLoginState,
}) {
  const { post } = postState;
  const { id } = currentUserState;

  return (
    <div className="mypage-post">
      <AddPost
        currentUserState={currentUserState}
        postState={postState}
        setPostState={setPostState}
      />
      <div>
        {post.filter((v) => v.id === id).map((p, index) => (
          <div key={index}>
            <ShowPostOthersPage
              postState={postState}
              setPostState={setPostState}
              currentUserState={currentUserState}
              commentState={commentState}
              setCommentState={setCommentState}
              p={p}
              index={index}
              loginState={loginState}
              setLoginState={setLoginState}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPagePost;
