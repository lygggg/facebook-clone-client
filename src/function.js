/* eslint-disable camelcase */
/* eslint-disable max-len */

// 게시글 추가 함수
export const addPost = (postState, temptId, temptContents) => {
  const { post } = postState;

  return {
    ...postState,
    post: [...post,
      {
        id: temptId,
        contents: temptContents,
        thumbCount: 0,
        sharingCount: 0,
        commentCount: 0,
      },
    ],
  };
};

// 댓글 추가 함수
export const addComment = (commentState, post, temptStatement) => {
  const { comment } = commentState;
  return {
    ...commentState,
    comment: [...comment,
      {
        id: post.id,
        writer: '관리자',
        statement: temptStatement,
      },
    ],
  };
};

// 댓글이 추가되면 게시글의 "댓글n개"를 재설정해주는 함수
export const plusCommentCount = (postState, p_post) => {
  const { post } = postState;

  return {
    ...postState,
    post: post.map((p) => (p.id !== p_post.id ? p : { ...p, commentCount: p.commentCount + 1 })),
  };
};
