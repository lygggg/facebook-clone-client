import React from 'react';
import Comment from '../comments/Comment';
import PostEditBox from './PostEditBox';
import {plusThumbCount, openPostEditBox, removePost } from '../../function';
import profile from '../../profile.jpeg';

function ShowPostOthersPage({
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
  p,
  index,
}) {
  const { id } = currentUserState;

  const handleThumbCount = async (specificPost) => {
    const { timeLinePosts } = await plusThumbCount(specificPost.uniqueKey, id)

    setPostState({ ...postState, post: [...timeLinePosts.reverse()]});
  };

  const handleRemovePost = async (specificPost) => {
    const { timeLinePosts } = await removePost(specificPost.uniqueKey);

    if (specificPost.id === id) {
      setPostState({ ...postState, post: [...timeLinePosts.reverse()] });
      alert('해당 게시글이 삭제되었습니다');
    } else {
      alert('게시글은 해당 작성자만 삭제할 수 있습니다');
    }
  };

  const handleEditPost = (specificPost) => {
    if (specificPost.id === id) {
      setPostState(openPostEditBox(postState, specificPost));
    } else {
      alert('게시글의 수정은 해당 작성자만 할 수 있습니다');
    }
  };

  return (
    <div>
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
              <img className="image" src={p.profile} alt="" width="7%" />
              <span className="post-name">{p.name}</span>
            </div>
            <br />
            <div className="post-contents">{p.contents}</div>
            <img style={{ width: '100%' }} src={p.image} alt="" />
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
    </div>
  );
}

export default ShowPostOthersPage;
