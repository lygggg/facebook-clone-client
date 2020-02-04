/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import profile from './profile.jpeg';
import { addComment, plusCommentCount, plusCommentThumbCount } from './function';

const initialComment = {
  temptStatement: '',
  comment: [],
};

const Comment = ({ postState, specificPost, setPostState }) => { // 여기서 specificPost는 특정 게시글을 의미함. p.map 한거
  const [commentState, setCommentState] = useState(initialComment);
  const { temptStatement, comment } = commentState;
  const appropriateComment = [];

  const setCommentTemptStatement = (temptStatement) => {
    setCommentState({ ...commentState, temptStatement });
  };

  const handleAddComment = (specificPost) => {
    if (temptStatement.trim()) {
      setCommentState({ ...addComment(commentState, specificPost, temptStatement), temptStatement: '' });
      setPostState(plusCommentCount(postState, specificPost));
    }
  };

  const handleCommentThumbCount = (specificComment) => {
    setCommentState(plusCommentThumbCount(commentState, specificComment));
  };

  comment.forEach((v) =>
    (specificPost.id === v.id ? appropriateComment.push(v) : v));

  return (
    <>
      <div className="comment">
        <div className="comment-write">
          <span className="comment-datgle">댓글 </span>
          <input
            type="text"
            value={temptStatement}
            onChange={(e) => setCommentTemptStatement(e.target.value)}
          />
          <button
            className="comment-input"
            type="button"
            onClick={() => handleAddComment(specificPost)}
          >
          입력
          </button>
        </div>
      </div>
      <div className="comment-contents">
        {appropriateComment.map((v) =>
          <div key={v.writer}>
            <span className="comment-main">
              <img className="comment-image" src={profile} alt="" width="3.5%" />
              {v.writer} : {v.statement}
            </span>
            <button
              type="button"
              className="comment-thumb"
              onClick={() => handleCommentThumbCount(v)}
            >좋아요
            </button>
            <span className="comment-thumb-count">{v.commentThumbCount}</span>
          </div>)}
      </div>
    </>
  );
};

export default Comment;
