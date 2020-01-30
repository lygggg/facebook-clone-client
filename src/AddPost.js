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
      id: '홍길동', // 작성자
      contents: '오늘은 날씨가 쌀쌀하니 좋아요 기능을 넣어보면 좋을 것 같다', // 게시글의 내용
      thumbCount: 0, // 좋아요 갯수
      sharingCount: 0, // 공유 횟수
      commentCount: 0, // 댓글 갯수
      comment: '',
    },
  ],
};
/* 댓글 입력 버튼을 누르면, 해당 게시글의 id값을 onclick함수의 매개변수로 넣어주고 id를 포함한 객체를 comment
배열에 넣어준다. 그리고 post.map에서 post.id == comment.id 인 것을 찾아서 이것의 statement를 렌더링 해준다.
*/
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
      <div className="addpost">
        <div className="addpost-title">게시물 만들기</div>
        <div>작성자: <input className="addpost-writer" type="text" value={temptId} onChange={(e) => setPostTemptId(e.target.value)} /></div>
        <div>내용: <input className="addpost-inputcontents" type="text" value={temptContents} onChange={(e) => setPostTemptContents(e.target.value)} /></div>
        <button className="addpost-out" type="button" onClick={handleAddPost}>게시</button>
      </div>
      <ShowPost poststate={poststate} />
    </>
  );
}

export default AddPost;
