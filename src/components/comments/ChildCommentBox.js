import React, { useState } from 'react';
import func from '../../function';

function ChildCommentBox({
  commentState,
  setCommentState,
  parentsComment,
  currentUserState,
}) {
  const { id, userName } = currentUserState;
  const { uniqueKey } = parentsComment;
  const [temptState, setTemptState] = useState('');

  const handleAddChildComment = async () => {
    if (temptState.trim()) {
      const { postComments } = await func.addChildComment(uniqueKey , temptState, id, userName);

      setCommentState({ ...commentState, comment: [...postComments.reverse()]});
    }
  };

  const childCommentEnterPressed = async (key) => {
    if (key === 'Enter') {
      await handleAddChildComment();
    }
  }

  return (
    <div className="child-comment">
      └ {userName} : <input
        className="child-comment-input-box"
        type="text"
        value={temptState}
        onChange={(e) => setTemptState(e.target.value)}
        onKeyPress={(e) => childCommentEnterPressed(e.key)}
      />
      <button type="button" className="child-comment-button" onClick={handleAddChildComment}>입력</button>
    </div>
  );
}

export default ChildCommentBox;
