/* eslint-disable no-alert */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState } from 'react';

function PostEditBox({
  specificPost,
  postState,
  setPostState,
  currentUserState,
}) {
  const [temptState, setTemptState] = useState('');
  const { post } = postState;
  const { id } = currentUserState;

  const setEditBox = (temptState) => {
    setTemptState(temptState);
  };

  const handleEditPostContents = () => {
    if (temptState.trim()) {
      if (specificPost.id === id) {
        setPostState({
          ...postState,
          post: post.map((p) =>
            (p.uniqueKey !== specificPost.uniqueKey ? p : { ...p, contents: temptState })),
        });
        setTemptState('');
        alert('게시글이 수정되었습니다. "수정" 버튼을 눌러서 창을 닫아주세요');
      } else {
        alert('게시글은 해당 작성자만 수정 할 수 있습니다');
      }
    } else {
      alert('수정사항을 입력해주세요');
    }
  };

  return (
    <div>
      <input
        className="post-edit-box"
        type="text"
        value={temptState}
        onChange={(e) => setEditBox(e.target.value)}
      />
      <button
        className="post-edit-complete"
        type="button"
        onClick={handleEditPostContents}
      >
      완료
      </button>
    </div>
  );
}

export default PostEditBox;
