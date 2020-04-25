import React, { useState } from 'react';
import func from '../../function';
import Swal from "sweetalert2";

function PostEditBox({
  specificPost,
  postState,
  setPostState,
  currentUserState,
}) {
  const [temptState, setTemptState] = useState('');
  const { id } = currentUserState;

  const setEditBox = (temptState) => {
    setTemptState(temptState);
  };

  const clickedEditSuccess = async () => {
    const { uniqueKey } = specificPost;

    if (!temptState.trim()) {
      await Swal.fire('', '수정사항을 입력해주세요', 'error');
      return;
    }

    if (specificPost.id !== id) {
      await Swal.fire('', '게시글은 해당 작성자만 수정 할 수 있습니다', 'error');
      return;
    }

    const { timeLinePosts } = await func.editPost(uniqueKey, temptState);
    setPostState({ ...postState, post: [...timeLinePosts.reverse()] });
    await Swal.fire('', '게시글이 수정되었습니다', 'success');
  };

  return (
    <div>
      <textarea
        className="showpost-edit-box"
        type="text"
        value={temptState}
        onChange={(e) => setEditBox(e.target.value)}
      />
      <button
        className="showpost-edit-complete"
        type="button"
        onClick={clickedEditSuccess}
      >
      완료
      </button>
    </div>
  );
}

export default PostEditBox;
