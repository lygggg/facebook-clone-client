/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';
import Comment from '../comments/Comment';
import PostEditBox from './PostEditBox';
import { plusThumbCount, removePost, onOffPostEditBox, scrapPost } from '../../function';
import profile from '../../profile.jpeg';

function ShowPost({
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
  setTopLevelState,
  p,
  index,
}) {
  const { id } = currentUserState;

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

  const postUserNameClicked = (specificPost) => {
    setTopLevelState(specificPost);
  };

  const scrapButtonClicked = (specificPost) => {
    setPostState(scrapPost(postState, specificPost, currentUserState));
    alert('스크랩이 완료되었습니다! 마이페이지에서 확인하세요');
  };

  return (
    <div key={index}>
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
            <Link
              to="/otherspage"
              className="post-name"
              type="button"
              onClick={() => postUserNameClicked(p)}
            >
              {p.name}
            </Link>
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
          <button
            className="post-button-good"
            onClick={() => scrapButtonClicked(p)}
            type="button"
          >
          스크랩
          </button>
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
    </div>
  );
}

export default ShowPost;
