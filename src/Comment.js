/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';

const Comment = (props) => {
// comment.id === postId 인 것만 추출해서 렌더링
  const { commentstate } = props;
  const { comment } = commentstate;
  // const { comment } = commentstate;
  return (
    <div>
      {comment.map((v) =>
        <div key={v.writer} className="comment-contents">
          <span className="comment-main">
            <img className="comment-image"  alt="" width="5%" />
            {v.writer} : {v.statement}
          </span>
          <button type="button" className="comment-thumb">좋아요</button>
          <span className="comment-thumb-count">{v.commentThumbCount}</span>
        </div>)}
    </div>
  );
};

export default Comment;
