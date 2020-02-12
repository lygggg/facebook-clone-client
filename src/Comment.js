/* eslint-disable react/no-array-index-key */
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
import {
  addComment,
  plusCommentCount,
  plusCommentThumbCount,
  onOffChildCommentBox,
} from './function';
import ChildCommentBox from './ChildCommentBox';

function Comment({
  specificPost,
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
}) {
  const { comment } = commentState;
  const { userName, id } = currentUserState;
  const [temptState, setTemptState] = useState('');
  const appropriateComment = [];

  const setCommentTemptStatement = (temptState) => {
    setTemptState(temptState);
  };

  const handleAddComment = (specificPost) => {
    if (temptState.trim()) {
      setCommentState(addComment(commentState, specificPost, temptState, userName, id));
      setTemptState('');
      setPostState(plusCommentCount(postState, specificPost));
    }
  };

  const handleCommentThumbCount = (specificComment) => {
    setCommentState(plusCommentThumbCount(commentState, specificComment, currentUserState));
  };

  const ChildCommentButtonClicked = (specificComment) => {
    setCommentState(onOffChildCommentBox(commentState, specificComment, 1));
    if (specificComment.isChildCommentFunctionOn === true) {
      setCommentState(onOffChildCommentBox(commentState, specificComment, 0));
    }
  };

  comment.forEach((v) =>
    (specificPost.uniqueKey === v.id ? appropriateComment.push(v) : v));

  return (
    <>
      <div className="comment">
        <div className="comment-write">
          <span className="comment-datgle">댓글달기 </span>
          <input
            type="text"
            value={temptState}
            onChange={(e) => setCommentTemptStatement(e.target.value)}
          />
          <button
            className="comment-input"
            type="button"
            onClick={() => handleAddComment(specificPost, userName)}
          >
          입력
          </button>
        </div>
      </div>
      <div className="comment-contents">
        {appropriateComment.map((v, index) =>
          <div key={index}>
            <span className="comment-main">
              <img className="comment-image" src={profile} alt="" width="3.5%" />
              {v.writer} : {v.statement}
            </span>
            <button
              className="comment-thumb"
              type="button"
              onClick={() => ChildCommentButtonClicked(v)}
            >
            대댓글
            </button>
            <button
              type="button"
              className="comment-thumb"
              onClick={() => handleCommentThumbCount(v)}
            >좋아요
            </button>
            <span className="comment-thumb-count">{v.commentThumbCount.length}</span>
            {v.isChildCommentFunctionOn
              ? (
                <div className="child-comment-main">
                  <ChildCommentBox
                    commentState={commentState}
                    setCommentState={setCommentState}
                    parentsComment={v}
                    currentUserState={currentUserState}
                  />
                </div>
              ) : <></>}
            <div>
              {v.childComment.map((k, index) =>
                <div key={index} className="child-contents">
                 └ {k.name} : {k.statement}
                </div>)}
            </div>
          </div>)}
      </div>
    </>
  );
}

export default Comment;
