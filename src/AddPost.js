/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { addPost } from './function';
import ShowPost from './ShowPost';

const initialPost = {
  temptId: '',
  temptContents: '',
  commentCount: 0, // 게시글의 댓글 갯수
  post: [
    {
      id: '홍길동', // 작성자
      contents: '오늘은 날씨가 쌀쌀하니 좋아요 기능을 넣어보면 좋을 것 같다', // 게시글의 내용
      thumbCount: 0, // 좋아요 갯수
      sharingCount: 0, // 공유 횟수
    },
  ],
};

function AddPost() {
  const [poststate, setPostState] = useState(initialPost);
  const { temptId, temptContents } = poststate;

  const setPostTemptId = (temptId) => {
    setPostState({ ...poststate, temptId });
  };
  const setPostTemptContents = (temptContents) => {
    setPostState({ ...poststate, temptContents });
  };

  const handleAddPost = () => {
    if (temptId.trim() && temptContents.trim()) {
      setPostState({ ...addPost(poststate, temptId, temptContents), temptId: '', temptContents: '' });
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
        poststate={poststate}
        setPostState={setPostState}
      />
    </>
  );
}

export default AddPost;
