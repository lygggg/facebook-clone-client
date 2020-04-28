import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Comment from '../comments/Comment';
import PostEditBox from './PostEditBox';
import func from '../../function';
import Swal from "sweetalert2";
import ModalBox from "../modal";

const callAPI = async (postState, setPostState) => {
  const { timeLinePosts } = await func.getPosts();

  setPostState({
    ...postState,
    post: [...timeLinePosts.reverse()],
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
  loginState,
  setLoginState,
}) {
  const { id } = currentUserState;

  useEffect(() => {
    callAPI(postState, setPostState);
  }, []);

  const handleThumbCount = async (specificPost) => {
    const { timeLinePosts } = await func.plusThumbCount(specificPost.uniqueKey, id)

    setPostState({ ...postState, post: [...timeLinePosts.reverse()]});
  };

  const handleRemovePost = async (specificPost) => {
    if (specificPost.id === id) {
      const { timeLinePosts } = await func.removePost(specificPost.uniqueKey);
      setPostState({ ...postState, post: [...timeLinePosts.reverse()] });
      await Swal.fire('', '게시글이 삭제되었습니다', 'success');
    } else {
      await Swal.fire('', '게시글은 해당 작성자만 삭제할 수 있습니다', 'error');
    }
  };

  const scrapButtonClicked = async (specificPost) => {
    await Swal.fire('', '스크랩이 완료되었습니다', 'success');
  };

  const handleEditPost = (specificPost) => {
    if (specificPost.id === id) {
      setPostState(func.openPostEditBox(postState, specificPost));
    } else {
      Swal.fire('', '게시글은 해당 작성자만 수정할 수 있습니다', 'error');
    }
  };

  const postUserNameClicked = (specificPost) => {
    setTopLevelState(specificPost);
  };

  return (
    <div key={index}>
      <div className="showpost">
        <div className="showpost-feed">
          {specificPost.name} 님이 게시글을 업로드했습니다.
        </div>
        <div>
          <div className="showpost-writer">
            <img className="profile-image" src={specificPost.profile} alt="" width="7%" />
            <div className="showpost-time">
              {specificPost.time[0]}년 {specificPost.time[1]}월 {specificPost.time[2]}일　{specificPost.time[3]} : {specificPost.time[4]}
            </div>
            <Link
              to="/otherspage"
              className="showpost-name"
              type="button"
              onClick={() => postUserNameClicked(specificPost)}
            >
              {specificPost.name}
            </Link>
            <ModalBox
              specificPost={specificPost}
              postState={postState}
              setPostState={setPostState}
              currentUserState={currentUserState}
            />
          </div>
          <br />
          <div className="showpost-contents">{specificPost.contents}</div>
          <img className="showpost-image" src={specificPost.image} alt="" />
          <div className="goodbar-grid">
            <div>
              <span className="showpost-goodbar1">좋아요{specificPost.thumbCount.length}개</span>
            </div>
            <div>
              <span className="showpost-goodbar2">댓글{specificPost.commentCount}개</span>
              <span>{' '}</span>
              <span className="showpost-goodbar2">공유{specificPost.sharingCount}개</span>
            </div>
          </div>
          <br />
          <button
            className="showpost-button-good"
            type="button"
            onClick={() => handleThumbCount(specificPost)}
          >
            좋아요
          </button>
          <button className="showpost-button-good" type="button">댓글</button>
          <button
            className="showpost-button-good"
            onClick={() => scrapButtonClicked(specificPost)}
            type="button"
          >
            스크랩
          </button>
        </div>
        <div>
          <Comment
            specificPost={specificPost}
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

export default ShowPostHome;
