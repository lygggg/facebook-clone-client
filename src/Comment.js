/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import profile from './profile.jpeg';

const Comment = ({ commentState, post }) => {
  const { comment } = commentState;
  const appropriateComment = [];

  for (let i = 0; i < comment.length; i++) {
    if (post.id === comment[i].id) {
      appropriateComment.push(comment[i]);
    }
  }

  return (
    <div className="comment-contents">
      {appropriateComment.map((v) =>
        <div key={v.writer}>
          <span className="comment-main">
            <img className="comment-image" src={profile} alt="" width="3.5%" />
            {v.writer} : {v.statement}
          </span>
          <button type="button" className="comment-thumb">좋아요</button>
          <span className="comment-thumb-count">{v.commentsThumbCount}</span>
        </div>)}
    </div>
  );
};

export default Comment;
