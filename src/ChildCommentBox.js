/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { addChildComment } from './function';

function ChildCommentBox({
  commentState,
  setCommentState,
  parentsComment,
  currentUserState,
}) {
  const { id, userName } = currentUserState;
  const [temptState, setTemptState] = useState('');

  const handleAddChildComment = () => {
    if (temptState.trim()) {
      setCommentState(addChildComment(commentState, temptState, id, userName, parentsComment));
      setTemptState('');
    }
  };

  return (
    <div className="child-comment">
      └ {userName} : <input type="text" value={temptState} onChange={(e) => setTemptState(e.target.value)} />
      <button type="button" className="comment-input" onClick={handleAddChildComment}>입력</button>
    </div>
  );
}

export default ChildCommentBox;
