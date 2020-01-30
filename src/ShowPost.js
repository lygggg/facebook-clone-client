/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import profile from './profile.jpeg';
import { addComment } from './function';
import Comment from './Comment';

const initialComment = {
  temptStatement: '',
  comment: [{
    writer: 'das',
    statement: 'ssss',
  }],
};

function ShowPost({ poststate }) {
  const { post } = poststate;
  const [commentstate, setCommentState] = useState(initialComment);
  const { comment, temptStatement } = commentstate;

  const setCommentTemptStatement = (temptStatement) => {
    setCommentState({ ...commentstate, temptStatement });
  };

  const handleAddComment = (postId) => {
    setCommentState({ ...addComment(commentstate, postId, temptStatement) });
  };

  // 댓글 입력 버튼까지 누르면 아주 잘 됨. comment 배열에 id랑 statement모두 잘 들어감. 문제는 그리는게 안됨.

  return (
    <div>
      {post.map((p) =>
        <>
          <div key={p.id} className="post">
            <div className="post-feed">
              {p.id} 님이 게시글을 업로드했습니다.
            </div>
            <div className="post-main">
              <div className="post-writer"><img className="image" src={profile} alt="" width="7%" /> {p.id}</div>
              <br />
              <div className="post-contents">{p.contents}</div>
              <span className="post-goodbar1">좋아요{p.thumbCount}개</span>
              <span className="post-goodbar2">댓글{p.commentCount}개</span>
              <span className="post-goodbar3">공유{p.sharingCount}개</span>
              <br />
              <button className="post-button-good" type="button">좋아요</button>
              <button className="post-button-good" type="button">댓글</button>
              <button className="post-button-good" type="button">공유하기</button>
            </div>
          </div>
          <div className="comment">
            <div className="comment-write">
              <input type="text" onChange={(e) => setCommentTemptStatement(e.target.value)} />
              <button className="comment-input" type="button" onClick={() => handleAddComment(p.id)}>입력</button>
            </div>
          </div>
          <div>
            <Comment
              post={post}
              commentstate={commentstate}
            />
          </div>
        </>)}
    </div>
  );
}

export default ShowPost;
