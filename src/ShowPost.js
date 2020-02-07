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

function ShowPost({ postState, setPostState, currentUserState }) {
  const { post } = postState;

  const handleThumbCount = (specificPost) => {
    setPostState(plusThumbCount(postState, specificPost, currentUserState));
  };

  return (
    <div>
      {post.map((p, index) =>
        <div key={index}>
          <div className="post">
            <div className="post-feed">
              {p.name} 님이 게시글을 업로드했습니다.
            </div>
            <div className="post-main">
              <div className="post-writer">
                <img className="image" src={profile} alt="" width="7%" />
                {p.name}
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
            />
          </div>
        </div>)}
    </div>
  );
}

export default ShowPost;
