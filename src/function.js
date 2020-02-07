/* eslint-disable no-nested-ternary */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */

// 게시글 추가 함수
export const addPost = (postState, userName, userid, temptContents) => {
  const { post } = postState;

  return {
    ...postState,
    post: [...post,
      {
        id: userid, // 이 게시글을 누가 썼는지 식별 userid = currentUser.id
        name: userName, // 이 게시글을 쓴 User의 이름
        contents: temptContents, // 게시글의 내용
        thumbCount: [], // 좋아요 개수. 배열의 길이를 반환하여 출력
        sharingCount: 0, // 공유 개수를 출력
        commentCount: 0, // 게시글에 달린 댓글 개수를 출력
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
        id: specificPost.name, // 어떤 게시글에 달린 댓글인지 확인하기 위한 것
        writer: userName, // 댓글 쓰는 사람의 이름
        statement: temptStatement, // 댓글 내용
        commentThumbCount: 0, // 댓글의 좋아요 개수
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

// 좋아요 버튼이 눌리면 해당 게시글의 좋아요가 +1, 또 눌리면 -1(좋아요 취소)이 되게 하는 함수
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
        id: temptJoiningId, // 고유 아이디. 중복 없음
        pw: temptJoiningPw, // 패스워드
        userName: temptJoiningName, // 이름. 중복 가능
      },
    ],
  };
};
