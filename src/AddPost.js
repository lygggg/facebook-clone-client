/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { addPost } from './function';
import ShowPost from './ShowPost';

const initialPost = {
  temptId: '',
  temptContents: '',
  post: [
    {
      id: '전우민', // 작성자
      contents: '여기는 게시글 내용이 작성되는 영역입니다. 위의 "게시글 만들기"에서 글을 입력하면 여기에 등록됩니다.', // 게시글의 내용
      thumbCount: 0, // 좋아요 갯수
      sharingCount: 0, // 공유 횟수
      commentCount: 0, // 게시글의 댓글 갯수
    },
  ],
};

function AddPost() {
  const [postState, setPostState] = useState(initialPost);
  const { temptId, temptContents } = postState;

  const setPostTemptId = (temptId) => {
    setPostState({ ...postState, temptId });
  };
  const setPostTemptContents = (temptContents) => {
    setPostState({ ...postState, temptContents });
  };

  const handleAddPost = () => {
    if (temptId.trim() && temptContents.trim()) {
      setPostState({ ...addPost(postState, temptId, temptContents), temptId: '', temptContents: '' });
    } else {
      alert('내용을 입력해주세요');
    }
  };

  return (
    <>
      <h1>Facebook</h1>
      <div className="addpost">
        <div className="addpost-title">게시물 만들기</div>
        <div>작성자: <input className="addpost-writer" type="text" value={temptId} onChange={(e) => setPostTemptId(e.target.value)} /></div>
        <div>내용: <input className="addpost-inputcontents" type="text" value={temptContents} onChange={(e) => setPostTemptContents(e.target.value)} /></div>
        <button className="addpost-out" type="button" onClick={handleAddPost}>게시</button>
      </div>
      <ShowPost
        postState={postState}
        setPostState={setPostState}
      />
    </>
  );
}

export default AddPost;
