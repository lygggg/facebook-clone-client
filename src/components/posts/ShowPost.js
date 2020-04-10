import React from 'react';
import Comment from '../comments/Comment';
import PostEditBox from './PostEditBox';
import func from '../../function';

function ShowPostOthersPage({
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
  p,
  index,
  loginState,
  setLoginState,
}) {
  const { id } = currentUserState;

  const handleThumbCount = async (specificPost) => {
    const { timeLinePosts } = await func.plusThumbCount(specificPost.uniqueKey, id);

    setPostState({ ...postState, post: [...timeLinePosts.reverse()] });
  };

  const handleRemovePost = async (specificPost) => {
    const { timeLinePosts } = await func.removePost(specificPost.uniqueKey);

    if (specificPost.id === id) {
      setPostState({ ...postState, post: [...timeLinePosts.reverse()] });
      alert('해당 게시글이 삭제되었습니다');
    } else {
      alert('게시글은 해당 작성자만 삭제할 수 있습니다');
    }
  };

  const handleEditPost = (specificPost) => {
    if (specificPost.id === id) {
      setPostState(func.openPostEditBox(postState, specificPost));
    } else {
      alert('게시글의 수정은 해당 작성자만 할 수 있습니다');
    }
  };

  return (
    <div key={index}>
      <div className="showpost">
        <div className="showpost-feed">
          {p.name}
          {' '}
          님이 게시글을 업로드했습니다.
        </div>
        <div>
          <div className="showpost-writer">
            <img className="profile-image" src={p.profile} alt="" width="7%" />
            <div className="showpost-time">
              {p.time[0]}년 {p.time[1]}월 {p.time[2]}일　{p.time[3]} : {p.time[4]}
            </div>
            <span className="showpost-name">
              {p.name}
            </span>
            <button
              className="showpost-edit"
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
            {!p.isEditButtonClicked
              ? (
                <button
                  className="showpost-remove"
                  type="button"
                  onClick={() => handleRemovePost(p)}
                >
                  삭제
                </button>
              ) : <></>}
          </div>
          <br />
          <div className="showpost-contents">{p.contents}</div>
          <img style={{ width: '100%' }} src={p.image} alt="" />
          <div className="goodbar-grid">
            <div>
              <span className="showpost-goodbar1">
                좋아요
                {p.thumbCount.length}
                개
              </span>
            </div>
            <div>
              <span className="showpost-goodbar2">
                댓글
                {p.commentCount}
                개
              </span>
              <span>{' '}</span>
              <span className="showpost-goodbar2">
                공유
                {p.sharingCount}
                개
              </span>
            </div>
          </div>
          <br />
          <button
            className="showpost-button-good"
            type="button"
            onClick={() => handleThumbCount(p)}
          >
            좋아요
          </button>
          <button className="showpost-button-good" type="button">댓글</button>
          <button className="showpost-button-good" type="button">스크랩</button>
        </div>
        <div>
          <Comment
            specificPost={p}
            setPostState={setPostState}
            postState={postState}
            currentUserState={currentUserState}
            commentState={commentState}
            setCommentState={setCommentState}
            loginState={loginState}
            setLoginState={setLoginState}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowPostOthersPage;
