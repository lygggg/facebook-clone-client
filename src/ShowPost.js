/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import profile from './profile.jpeg';
import Comment from './Comment';

function ShowPost({ poststate, setPostState }) {
  const { post, commentCount } = poststate;

  return (
    <div>
      {post.map((p) =>
        <>
          <div key={p.id} className="post">
            <div className="post-feed">
              {p.id} 님이 게시글을 업로드했습니다.
            </div>
            <div className="post-main">
              <div className="post-writer"><img className="image" src={profile} alt="" width="7%" /> {p.id}</div>
              <br />
              <div className="post-contents">{p.contents}</div>
              <span className="post-goodbar1">좋아요{p.thumbCount}개</span>
              <span className="post-goodbar2">댓글{commentCount}개</span>
              <span className="post-goodbar3">공유{p.sharingCount}개</span>
              <br />
              <button className="post-button-good" type="button">좋아요</button>
              <button className="post-button-good" type="button">댓글</button>
              <button className="post-button-good" type="button">공유하기</button>
            </div>
          </div>
          <div>
            <Comment
              post={p}
              setPostState={setPostState}
              poststate={poststate}
            />
          </div>
        </>)}
    </div>
  );
}

export default ShowPost;
