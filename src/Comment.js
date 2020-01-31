/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';

const Comment = ({ commentState, post }) => {
// comment = [{1번 댓글러와 내용}, {2번 댓글러와 내용} ]
// post 배열을 쫙 순회하는 중에, 예를들어 post[2]를 map을 이용해 바꾸던 중 아래
// comment 컴포넌트를 만나면, comment 컴포넌트가 post[2]의 id값을 보고 이 id에
// 해당하는 comment만 출력
// 지금 post.id랑 comment.id가 undefinded임. 이유는 comment가 배열객체인데
// comment[0].id가 아니라 comment.id이기 때문

  const { comment } = commentState;

  const appropriateComment = [];

  for (let i = 0; i < comment.length; i++) {
    if (post.id === comment[i].id) {
      appropriateComment.push(comment[i]);
    }
  }

  return (
    <div>
      {appropriateComment.map((v) =>
        <div key={v.writer} className="comment-contents">
          <span className="comment-main">
            <img className="comment-image"  alt="" width="5%" />
            {v.writer} : {v.statement}
          </span>
          <button type="button" className="comment-thumb">좋아요</button>
          <span className="comment-thumb-count">{v.commentsThumbCount}</span>
        </div>)}
    </div>
  );
};

export default Comment;
