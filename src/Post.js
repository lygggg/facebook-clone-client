/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addPost } from './function';
import ShowPost from './ShowPost';

function Post({
  postState,
  setPostState,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
  commentState,
  setCommentState,
}) {
  const [temptState, setTemptState] = useState('');
  const { userName, id } = currentUserState;
  const { isLoggedIn } = loginState;

  const setPostTemptContents = (temptState) => {
    setTemptState(temptState);
  };

  const handleAddPost = () => {
    if (temptState.trim()) {
      setPostState(addPost(postState, userName, id, temptState));
      setTemptState('');
    } else {
      alert('내용을 입력해주세요');
    }
  };

  const setIsLoggedInFalse = () => {
    setLoginState({ ...loginState, isLoggedIn: false, temptId: '', temptPw: '' });
    setCurrentUserState({ ...currentUserState, id: '', pw: '', userName: '' });
    alert('로그아웃 되었습니다');
  };

  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Facebook</h1>
      <button type="button" onClick={setIsLoggedInFalse}>로그아웃</button>
      <div className="addpost">
        <div className="addpost-title">게시물 만들기</div>
        <div className="addpost-notion"><span className="addpost-span">{userName}</span>님, 무슨 생각을 하고 계신가요?</div>
        <div className="addpost-notion">생각을 게시글로 표현 해주세요</div>
        <input className="addpost-inputcontents" type="text" value={temptState} onChange={(e) => setPostTemptContents(e.target.value)} />
        <button className="addpost-out" type="button" onClick={handleAddPost}>게시</button>
      </div>
      <ShowPost
        postState={postState}
        setPostState={setPostState}
        currentUserState={currentUserState}
        commentState={commentState}
        setCommentState={setCommentState}
      />
    </>
  );
}

export default Post;
