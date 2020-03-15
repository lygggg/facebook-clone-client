import React from 'react';
import ShowPost from '../components/posts/ShowPost';

function OthersPagePost({
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
  loginState,
  setLoginState,
  specificPost,
}) {
  const { post } = postState;

  return (
    <div className="timeline-post-mypage">
      {post.filter((v) => v.id === specificPost.id).length === 0
        ? (
          <div className="showpost">
            <div className="no-post">게시글이 없습니다.</div>
          </div>
        )
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
              loginState={loginState}
              setLoginState={setLoginState}
            />
          </div>
        ))}
    </div>
  );
}

export default OthersPagePost;
