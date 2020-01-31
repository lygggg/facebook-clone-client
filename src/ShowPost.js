/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import profile from './profile.jpeg';
import { addComment, plusCommentCount } from './function';
import Comment from './Comment';

const initialComment = {
  temptStatement: '',
  comment: [],
};

function ShowPost({ poststate, setPostState }) {
  const { post, commentCount } = poststate;
  const [commentState, setCommentState] = useState(initialComment);
  const { temptStatement } = commentState;

  const setCommentTemptStatement = (temptStatement) => {
    setCommentState({ ...commentState, temptStatement });
  };

  const handleAddComment = (post) => {
    if (temptStatement.trim()) {
      setCommentState({ ...addComment(commentState, post, temptStatement), temptStatement: '' });
    }
    setPostState({ ...plusCommentCount(poststate) });
  };

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
              <span className="post-goodbar2">댓글{commentCount}개</span>
              <span className="post-goodbar3">공유{p.sharingCount}개</span>
              <br />
              <button className="post-button-good" type="button">좋아요</button>
              <button className="post-button-good" type="button">댓글</button>
              <button className="post-button-good" type="button">공유하기</button>
            </div>
          </div>
          <div className="comment">
            <div className="comment-write">
              <span className="comment-datgle">댓글 </span>
              <input type="text" value={temptStatement} onChange={(e) => setCommentTemptStatement(e.target.value)} />
              <button className="comment-input" type="button" onClick={() => handleAddComment(p)}>입력</button>
            </div>
          </div>
          {/* post 배열을 쫙 순회하는 중에, 예를들어 post[2]를 map을 이용해 바꾸던 중 아래
              comment 컴포넌트를 만나면, comment 컴포넌트가 post[2]의 id값을 보고 이 id에
              해당하는 comment만 출력 */}
          <div>
            <Comment
              post={p}
              commentState={commentState}
            />
          </div>
        </>)}
    </div>
  );
}

export default ShowPost;
