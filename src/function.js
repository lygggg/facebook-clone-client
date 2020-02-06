/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */

// 게시글 추가 함수
export const addPost = (postState, userName, temptContents) => {
  const { post } = postState;

  return {
    ...postState,
    post: [...post,
      {
        id: userName,
        contents: temptContents,
        thumbCount: 0,
        sharingCount: 0,
        commentCount: 0,
      },
    ],
  };
};

// 댓글 추가 함수
export const addComment = (commentState, specificPost, temptStatement, userName) => {
  const { comment } = commentState;
  return {
    ...commentState,
    comment: [...comment,
      {
        id: specificPost.id, // 어떤 게시글에 달린 댓글인지 확인하기 위한 것
        writer: userName,
        statement: temptStatement,
        commentThumbCount: 0,
      },
    ],
  };
};

// 댓글이 추가되면 게시글의 "댓글n개"를 재설정해주는 함수
export const plusCommentCount = (postState, specificPost) => {
  const { post } = postState;

  return {
    ...postState,
    post: post.map((p) =>
      (p !== specificPost ? p : { ...p, commentCount: p.commentCount + 1 })),
  };
};

// 좋아요 버튼이 눌리면 해당 게시글의 좋아요가 +1 되게 하는 함수
export const plusThumbCount = (postState, specificPost) => {
  const { post } = postState;

  return {
    ...postState,
    post: post.map((p) =>
      (p !== specificPost ? p : { ...p, thumbCount: p.thumbCount + 1 })),
  };
};

// 댓글에 있는 좋아요 버튼이 눌리면 해당 댓글에 좋아요가 +1 되게 하는 함수
export const plusCommentThumbCount = (commentState, specificComment) => {
  const { comment } = commentState;

  return {
    ...commentState,
    comment: comment.map((v) =>
      (v !== specificComment ? v
        : { ...v, commentThumbCount: specificComment.commentThumbCount + 1 })),
  };
};

export const AddJoining = (loginState, temptJoiningId, temptJoiningPw, temptJoiningName) => {
  const { users } = loginState;

  return {
    ...loginState,
    users: [...users,
      {
        id: temptJoiningId,
        pw: temptJoiningPw,
        userName: temptJoiningName,
      },
    ],
  };
};
