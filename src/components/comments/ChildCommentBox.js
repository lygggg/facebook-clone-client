import React, { useState } from 'react';
import { addChildComment } from '../../function';

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
      const { postComments } = await addChildComment(uniqueKey , temptState, id, userName);

      setCommentState({ ...commentState, comment : [...postComments.comment]});
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
