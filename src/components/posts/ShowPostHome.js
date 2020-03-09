import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Comment from '../comments/Comment';
import PostEditBox from './PostEditBox';

import {
  removePost,
  addScrap,
  getPosts,
  plusThumbCount,
  openPostEditBox
} from '../../function';

const callAPI = async (postState, setPostState) => {
  const { timeLinePosts } = await getPosts();

  setPostState({
    ...postState,
    post: [...timeLinePosts],
  });
}

function ShowPostHome({
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
  setTopLevelState,
  specificPost,
  index,
}) {
  const { id } = currentUserState;

  useEffect(() => {
    callAPI(postState, setPostState);
  }, [postState.scrap]);

  const handleThumbCount = async (specificPost) => {
    const { timeLinePosts } = await plusThumbCount(specificPost.uniqueKey, id)

    setPostState({ ...postState, post: [...timeLinePosts]});
  };

  const handleRemovePost = async (specificPost) => {
    const { timeLinePosts } = await removePost(specificPost.uniqueKey);

    if (specificPost.id === id) {
      setPostState({ ...postState, post: [...timeLinePosts] });
      alert('해당 게시글이 삭제되었습니다');
    } else {
      alert('게시글은 해당 작성자만 삭제할 수 있습니다');
    }
  };

  const scrapButtonClicked = async (specificPost) => {
    const { scrap } = postState;
    const { id, userName } = currentUserState;
    const { name, contents, uniqueKey, profile } = specificPost;

    const { timeLinePosts } = await addScrap(id, userName, name, contents, uniqueKey, profile);

    setPostState({ ...postState, scrap: [...timeLinePosts] });
    alert('스크랩이 완료되었습니다! 마이페이지에서 확인하세요');
  };

  const handleEditPost = (specificPost) => {
    if (specificPost.id === id) {
      setPostState(openPostEditBox(postState, specificPost));
    } else {
      alert('게시글의 수정은 해당 작성자만 할 수 있습니다');
    }
  };

  const postUserNameClicked = (specificPost) => {
    setTopLevelState(specificPost);
  };

  return (
    <div key={index}>
      <div className="post">
        <div className="post-feed">
          {specificPost.name} 님이 게시글을 업로드했습니다.
          <button
            className="post-edit"
            type="button"
            onClick={() => handleEditPost(specificPost)}
          >
          수정
          </button>
          {specificPost.isEditButtonClicked
            ? (
              <div>
                <PostEditBox
                  specificPost={specificPost}
                  postState={postState}
                  setPostState={setPostState}
                  currentUserState={currentUserState}
                />
              </div>
            ) : <></>}
          <button
            className="post-remove"
            type="button"
            onClick={() => handleRemovePost(specificPost)}
          >
          삭제
          </button>
        </div>
        <div className="post-main">
          <div className="post-writer">
            <img className="image" src={specificPost.profile} alt="" width="7%" />
            <Link
              to="/otherspage"
              className="post-name"
              type="button"
              onClick={() => postUserNameClicked(specificPost)}
            >
              {specificPost.name}
            </Link>
          </div>
          <br />
          <div className="post-contents">{specificPost.contents}</div>
          <img style={{ width: '100%' }} src={specificPost.image} alt="" />
          <span className="post-goodbar1">좋아요{specificPost.thumbCount.length}개</span>
          <span className="post-goodbar2">댓글{specificPost.commentCount}개</span>
          <span className="post-goodbar3">공유{specificPost.sharingCount}개</span>
          <br />
          <button
            className="post-button-good"
            type="button"
            onClick={() => handleThumbCount(specificPost)}
          >
          좋아요
          </button>
          <button className="post-button-good" type="button">댓글</button>
          <button
            className="post-button-good"
            onClick={() => scrapButtonClicked(specificPost)}
            type="button"
          >
            스크랩
          </button>
        </div>
      </div>
      <div>
        <Comment
          specificPost={specificPost}
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

export default ShowPostHome;
