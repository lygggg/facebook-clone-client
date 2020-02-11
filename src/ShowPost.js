/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import profile from './profile.jpeg';
import Comment from './Comment';
import { plusThumbCount } from './function';

function ShowPost({
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
}) {
  const { post, isEditButtonClicked } = postState;
  const { id } = currentUserState;

  const handleThumbCount = (specificPost) => {
    setPostState(plusThumbCount(postState, specificPost, currentUserState));
  };

  const handleRemovePost = (specificPost) => {
    if (specificPost.id === id) {
      setPostState({
        ...postState,
        post: post.filter((p) => specificPost.uniqueKey !== p.uniqueKey),
      });
      alert('해당 게시글이 삭제되었습니다');
    } else {
      alert('게시글은 해당 작성자만 삭제할 수 있습니다');
    }
  };

  const handleEditPost = (specificPost) => {
    if (specificPost.id === id) {
      
    } else {
      alert('게시글은 해당 작성자만 수정할 수 있습니다');
    }
  };

  return (
    <div>
      {post.map((p, index) =>
        <div key={index}>
          <div className="post">
            <div className="post-feed">
              {p.name} 님이 게시글을 업로드했습니다.
              <button
                className="post-edit"
                type="button"
                onClick={() => handleEditPost(p)}
              >
              수정
              </button>
              {p.isEditButtonClicked
                ? (
                  <div>
                    <PostEditBox
                      something
                    />
                  </div>
                ) : <></>}
              <button
                className="post-remove"
                type="button"
                onClick={() => handleRemovePost(p)}
              >
              삭제
              </button>
            </div>
            <div className="post-main">
              <div className="post-writer">
                <img className="image" src={profile} alt="" width="7%" />
                <span className="post-name">{p.name}</span>
              </div>
              <br />
              <div className="post-contents">{p.contents}</div>
              <span className="post-goodbar1">좋아요{p.thumbCount.length}개</span>
              <span className="post-goodbar2">댓글{p.commentCount}개</span>
              <span className="post-goodbar3">공유{p.sharingCount}개</span>
              <br />
              <button
                className="post-button-good"
                type="button"
                onClick={() => handleThumbCount(p)}
              >
              좋아요
              </button>
              <button className="post-button-good" type="button">댓글</button>
              <button className="post-button-good" type="button">공유하기</button>
            </div>
          </div>
          <div>
            <Comment
              specificPost={p}
              setPostState={setPostState}
              postState={postState}
              currentUserState={currentUserState}
              commentState={commentState}
              setCommentState={setCommentState}
            />
          </div>
        </div>)}
    </div>
  );
}

export default ShowPost;
