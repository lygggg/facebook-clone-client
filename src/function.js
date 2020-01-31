// 게시글 추가 함수
export const addPost = (poststate, temptId, temptContents) => {
  const { post } = poststate;

  return {
    ...poststate,
    post: [...post,
      {
        id: temptId,
        contents: temptContents,
        thumbCount: 0,
        sharingCount: 0,
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
        writer: 'Default Manager',
        statement: temptStatement,
      },
    ],
  };
};

// 댓글이 추가되면 게시글의 "댓글n개"를 재설정해주는 함수
export const plusCommentCount = (poststate) => {
  const { commentCount } = poststate;

  return {
    ...poststate,
    commentCount: commentCount + 1,
  };
};
