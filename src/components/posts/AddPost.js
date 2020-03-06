import React, { useState } from 'react';
import { addPost, getPosts } from '../../function';

function AddPost({
  currentUserState,
  postState,
  setPostState,
}) {
  const [temptState, setTemptState] = useState('');
  const { userName, id } = currentUserState;

  const setPostTemptContents = (temptState) => {
    setTemptState(temptState);
  };

  const handleAddPost = async () => {
    if (temptState.trim()) {
      const { timeLinePosts } = await addPost(id, userName, temptState);

      setPostState({ ...postState, post: [...timeLinePosts] });
      setTemptState('');
    } else {
      alert('내용을 입력해주세요');
    }
  };

  return (
    <div className="addpost">
      <div className="addpost-title">게시물 만들기</div>
      <div className="addpost-notion">
        <span className="addpost-span">
          {userName}
        </span>
        님, 무슨 생각을 하고 계신가요?
      </div>
      <div className="addpost-notion">생각을 게시글로 표현 해주세요</div>
      <input className="addpost-inputcontents" type="text" value={temptState} onChange={(e) => setPostTemptContents(e.target.value)} />
      <button className="addpost-out" type="button" onClick={handleAddPost}>게시</button>
    </div>
  );
}

export default AddPost;
