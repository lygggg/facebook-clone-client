import React, { useState, useEffect } from 'react';
import profile from '../../profile.jpeg';
import {
  getComments,
  addComment,
  plusCommentCount,
  plusCommentThumbCount,
  openChildCommentBox,
} from '../../function';
import ChildCommentBox from './ChildCommentBox';

const callAPI = async (commentState, setCommentState) => {
  const { postComments } = await getComments();

  setCommentState({
    ...commentState,
    comment: [...postComments],
  });
}

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
  const { uniqueKey } = specificPost;
  const [temptState, setTemptState] = useState('');
  const appropriateComment = [];

  useEffect(() => {
    callAPI(commentState, setCommentState);
  }, []);

  const setCommentTemptStatement = (temptState) => {
    setTemptState(temptState);
  };

  const handleAddComment = async () => {
    if (temptState.trim()) {
      const { postComments } = await addComment(uniqueKey, id, userName, temptState);
      const { timeLinePosts } = await plusCommentCount(uniqueKey);

      setCommentState({ ...commentState, comment: [...postComments] });
      setPostState({ ...postState, post: [...timeLinePosts] });
      setTemptState('');
    }
  };

  const handleCommentThumbCount = async (specificComment) => {
    const { postComments } = await plusCommentThumbCount(
      specificComment.uniqueKey,
      currentUserState.id,
    );

    setCommentState({ ...commentState, comment: [...postComments] });
  };

  const ChildCommentButtonClicked = (specificComment) => {
    setCommentState(openChildCommentBox(commentState, specificComment));
  };

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
            onClick={() => handleAddComment()}
          >
          입력
          </button>
        </div>
      </div>
      <div className="comment-contents">
        {comment.filter((v) => specificPost.uniqueKey === v.id).map((v, index) =>
          <div key={`Comment${index}`}>
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
            >
              좋아요
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
