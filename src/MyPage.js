/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PostEditBox from './PostEditBox';
import Comment from './Comment';
import profile from './profile.jpeg';
import { addPost, plusThumbCount, removePost, onOffPostEditBox } from './function';

function MyPage({
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
  const [timelinePageState, setTimelinePageState] = useState(false);
  const { userName, id } = currentUserState;
  const { isLoggedIn } = loginState;
  const { post } = postState;

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

  const logoutButtonClicked = () => {
    setLoginState({ ...loginState, isLoggedIn: false, temptId: '', temptPw: '' });
    setCurrentUserState({ ...currentUserState, id: '', pw: '', userName: '' });
    alert('로그아웃 되었습니다');
  };

  const moveToTimelinePage = () => {
    setTimelinePageState(true);
  };

  const handleThumbCount = (specificPost) => {
    setPostState(plusThumbCount(postState, specificPost, currentUserState));
  };

  const handleRemovePost = (specificPost) => {
    if (specificPost.id === id) {
      setPostState(removePost(postState, specificPost));
      alert('해당 게시글이 삭제되었습니다');
    } else {
      alert('게시글은 해당 작성자만 삭제할 수 있습니다');
    }
  };

  const handleEditPost = (specificPost) => {
    if (specificPost.isEditButtonClicked === false) {
      if (specificPost.id === id) {
        setPostState(onOffPostEditBox(postState, specificPost, 1));
      } else {
        alert('게시글의 수정은 해당 작성자만 할 수 있습니다');
      }
    } else {
      setPostState(onOffPostEditBox(postState, specificPost, 0));
    }
  };

  if (timelinePageState === true) {
    return <Redirect to="/post" />;
  }
  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Facebook</h1>
      <div>
        <span>{userName}</span>{' '}
        <button className="page-header" type="button" onClick={moveToTimelinePage}>홈</button>{' '}
        <button className="page-header" type="button">마이페이지</button>{' '}
        <button className="page-header" type="button" onClick={logoutButtonClicked}>로그아웃</button>
      </div>
      <br />
      <div className="addpost">
        <div className="addpost-title">게시물 만들기</div>
        <div className="addpost-notion"><span className="addpost-span">{userName}</span>님, 무슨 생각을 하고 계신가요?</div>
        <div className="addpost-notion">생각을 게시글로 표현 해주세요</div>
        <input className="addpost-inputcontents" type="text" value={temptState} onChange={(e) => setPostTemptContents(e.target.value)} />
        <button className="addpost-out" type="button" onClick={handleAddPost}>게시</button>
      </div>
      <div>
        {post.filter((v) => v.id === id).map((p, index) =>
          <div>
            <div key={`MyPageKey${index}`}>
              <div className="post">
                <div className="post-feed">
                  {p.name} 님이 게시글을 업로드했습니다.
                  <button
                    className="post-edit"
                    type="button"
                    onClick={() => handleEditPost(p)}
                  >
                  수정
                  </button>
                  {p.isEditButtonClicked
                    ? (
                      <div>
                        <PostEditBox
                          specificPost={p}
                          postState={postState}
                          setPostState={setPostState}
                          currentUserState={currentUserState}
                        />
                      </div>
                    ) : <></>}
                  <button
                    className="post-remove"
                    type="button"
                    onClick={() => handleRemovePost(p)}
                  >
                  삭제
                  </button>
                </div>
                <div className="post-main">
                  <div className="post-writer">
                    <img className="image" src={profile} alt="" width="7%" />
                    <span className="post-name">{p.name}</span>
                  </div>
                  <br />
                  <div className="post-contents">{p.contents}</div>
                  <span className="post-goodbar1">좋아요{p.thumbCount.length}개</span>
                  <span className="post-goodbar2">댓글{p.commentCount}개</span>
                  <span className="post-goodbar3">공유{p.sharingCount}개</span>
                  <br />
                  <button
                    className="post-button-good"
                    type="button"
                    onClick={() => handleThumbCount(p)}
                  >
                  좋아요
                  </button>
                  <button className="post-button-good" type="button">댓글</button>
                  <button className="post-button-good" type="button">스크랩</button>
                </div>
              </div>
            </div>
            <div>
              <Comment
                specificPost={p}
                setPostState={setPostState}
                postState={postState}
                currentUserState={currentUserState}
                commentState={commentState}
                setCommentState={setCommentState}
              />
            </div>
          </div>)}
      </div>
    </>
  );
}

export default MyPage;
