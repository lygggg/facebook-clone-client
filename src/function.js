/* eslint-disable no-nested-ternary */
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
        thumbCount: [],
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
export const plusThumbCount = (postState, specificPost, currentUserState) => {
  const { post } = postState;
  const { id } = currentUserState;

  return {
    ...postState,
    post: post.map((p) =>
      (p !== specificPost ? p
        : p.thumbCount.includes(id)
          ? { ...p, thumbCount: p.thumbCount.filter((v) => v !== id) }
          : { ...p, thumbCount: [...p.thumbCount, id] })),
    /* 함수가 호출되면 specificPost.thumbCount라는 배열에다가,
       if(thumbCount 안에 "id"라는 원소가 존재한다?) 배열에서 "id"원소를 삭제
       if(thumbCount 안에 "id"라는 원소가 없다?) 배열에 "id"원소를 삽입
       이런식으로 해서 thumbCount의 배열 길이로 좋아요의 개수를 출력한다 */
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
