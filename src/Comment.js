/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import profile from './profile.jpeg';
import { addComment, plusCommentCount, plusCommentThumbCount, addChildCommentBox } from './function';
import ChildComment from './ChildComment';

const Comment = ({
  specificPost,
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
}) => {
  const { temptStatement, comment } = commentState;
  const { userName, id } = currentUserState;
  const appropriateComment = [];

  const setCommentTemptStatement = (temptStatement) => {
    setCommentState({ ...commentState, temptStatement });
  };

  const handleAddComment = (specificPost) => {
    if (temptStatement.trim()) {
      setCommentState({ ...addComment(commentState, specificPost, temptStatement, userName, id), temptStatement: '' });
      setPostState(plusCommentCount(postState, specificPost));
    }
  };

  const handleCommentThumbCount = (specificComment) => {
    setCommentState(plusCommentThumbCount(commentState, specificComment, currentUserState));
  };

  const setIsChildCommentButtonTrue = (specificComment) => {
    setCommentState(addChildCommentBox(commentState, specificComment));
  };

  comment.forEach((v) =>
    (specificPost.contents === v.id ? appropriateComment.push(v) : v));

  // 여기에서 그리는 댓글에 있는 "대댓글 버튼"이 클릭되면 댓글입력창이 하나 더 나와야함.
  // 그러기 위해서는 대댓글 버튼이 클릭되었을 때, v값을 가져와서 comment[i].statement === v.statement
  // 를해서 true이면 ChildComment.js에서 조건부렌더링으로 댓글입력창을 보여주고, 아니면 안보여준다

  return (
    <>
      <div className="comment">
        <div className="comment-write">
          <span className="comment-datgle">댓글달기 </span>
          <input
            type="text"
            value={temptStatement}
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
              onClick={() => setIsChildCommentButtonTrue(v)}
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
                <div>
                  <ChildComment
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
};

export default Comment;
