import React, { useState, useEffect } from 'react';
import func from '../../function';
import ChildCommentBox from './ChildCommentBox';

const callAPI = async (commentState, setCommentState, loginState, setLoginState) => {
  const { postComments } = await func.getComments();
  const { userStore } = await func.getUsers();

  setLoginState({ ...loginState, users: [...userStore] });

  setCommentState({
    ...commentState,
    comment: [...postComments.reverse()],
  });
}

function Comment({
  specificPost,
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
  loginState,
  setLoginState,
}) {
  const { comment } = commentState;
  const { userName, id } = currentUserState;
  const { uniqueKey } = specificPost;
  const { users } = loginState;
  const [temptState, setTemptState] = useState('');

  useEffect(() => {
    callAPI(commentState, setCommentState, loginState, setLoginState);
  }, []);

  const setCommentTemptStatement = (temptState) => {
    setTemptState(temptState);
  };

  const handleAddComment = async () => {
    if (temptState.trim()) {
      const { postComments } = await func.addComment(uniqueKey, id, userName, temptState);
      const { timeLinePosts } = await func.plusCommentCount(uniqueKey);

      setCommentState({ ...commentState, comment: [...postComments.reverse()] });
      setPostState({ ...postState, post: [...timeLinePosts.reverse()] });
      setTemptState('');
    }
  };

  const handleCommentThumbCount = async (specificComment) => {
    const { postComments } = await func.plusCommentThumbCount(
      specificComment.uniqueKey,
      currentUserState.id,
    );

    setCommentState({ ...commentState, comment: [...postComments.reverse()] });
  };

  const ChildCommentButtonClicked = (specificComment) => {
    setCommentState(func.openChildCommentBox(commentState, specificComment));
  };
  return (
    <>
      <div className="comment">
        <span className="comment-word">댓글달기</span>
        <input
          className="comment-input-box"
          type="text"
          value={temptState}
          onChange={(e) => setCommentTemptStatement(e.target.value)}
        />
        <button
          className="comment-button"
          type="button"
          onClick={() => handleAddComment()}
        >
          입력
        </button>
      </div>
      <div className="comment-contents">
        {comment.filter((v) => specificPost.uniqueKey === v.id).map((v, index) =>
          <div className="comment-each" key={`Comment${index}`}>
            <span>
              <img
                className="comment-profile-image"
                src={users[users.findIndex(user => user.id === v.writerID)].profile}
                alt=""
                width="3.5%"
              />
              <div className="comment-statement">
                <span className="comment-writer">{v.writer}</span>
                <span className="comment-colon">:</span>
                <span className="comment-saying">{v.statement}</span>
              </div>
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
                  └ {k.name} :<span> </span>{k.statement}
                </div>)}
            </div>
          </div>)}
      </div>
    </>
  );
}

export default Comment;
