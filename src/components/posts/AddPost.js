/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { addPost } from '../../apis/service';

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
    const { timeLinePosts } = await addPost(id, userName, temptState);
    const { post } = timeLinePosts;
    const apiPost = post;

    console.log(apiPost);
    if (temptState.trim()) {
      setPostState({ ...postState, post: [...apiPost]})
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
