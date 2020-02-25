import Counter from './components/Counter';
/* ****************************************************** */
import {
  getUsers as apiGetUsers,
  addUser as apiAddUser,
  getPosts as apiGetPosts,
  addPost as apiAddPost,
  removePost as apiRemovePost,
  editPost as apiEditPost,
  plusThumbCount as apiPlusThumbCount,
  openEditBox as apiOpenEditBox,
  addScrap as apiAddScrap,
  getComments as apiGetComments,
  addComment as apiAddComment,
  plusCommentCount as apiPlusCommentCount,
  addChildComment as apiAddChildComment,
} from './apis/service';

// 유저 목록 불러오기
export const getUsers = async () => {
  return await apiGetUsers();
};

// 회원가입
export const addUser = async (id, pw, userName) => {
  return await apiAddUser(id, pw, userName);
};

// 게시글 목록 불러오기
export const getPosts = async () => {
  return await apiGetPosts();
};

// 게시글 추가
export const addPost = async (id, name, contents) => {
  return await apiAddPost(id, name, contents);
};

// 게시글 삭제
export const removePost = async (uniqueKey) => {
  return await apiRemovePost(uniqueKey);
};

// 게시글 수정
export const editPost = async (uniqueKey, editedContents) => {
  return await apiEditPost(uniqueKey, editedContents);
};

// 게시글 좋아요
export const plusThumbCount = async (uniqueKey, userId) => {
  return await apiPlusThumbCount(uniqueKey, userId);
}

// 게시글 스크랩
export const addScrap = async (whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey) => {
  return await apiAddScrap(whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey);
};

// 댓글 목록 불러오기
export const getComments = async () => {
  return await apiGetComments();
};

// 댓글 추가
export const addComment = async (id, userId, username, commentContents) => {
  return await apiAddComment(id, userId, username, commentContents);
};

// 댓글 추가시 댓글 개수 +1
export const plusCommentCount = async (uniqueKey) => {
  return await apiPlusCommentCount(uniqueKey);
}

// 대댓글 추가
export const addChildComment = async (uniqueKey, contents, userId, userName) => {
  return await apiAddChildComment(uniqueKey, contents, userId, userName);
}

/* ****************************************************** */

// // 게시글: 좋아요 버튼이 눌리면 해당 게시글의 좋아요가 +1, 또 눌리면 -1(좋아요 취소)이 되게 하는 함수
// export const plusThumbCount = (postState, specificPost, currentUserState) => {
//   const { post } = postState;
//   const { id } = currentUserState;

//   return {
//     ...postState,
//     post: post.map((p) =>
//       (p !== specificPost ? p
//         : p.thumbCount.includes(id)
//           ? { ...p, thumbCount: p.thumbCount.filter((v) => v !== id) }
//           : { ...p, thumbCount: [...p.thumbCount, id] })),
//     /* 함수가 호출되면 specificPost.thumbCount라는 배열에다가,
//        if(thumbCount 안에 "id"라는 원소가 존재한다?) 배열에서 "id"원소를 삭제
//        if(thumbCount 안에 "id"라는 원소가 없다?) 배열에 "id"원소를 삽입
//        이런식으로 해서 thumbCount의 배열 길이로 좋아요의 개수를 출력한다 */
//   };
// };

// 댓글: 좋아요 버튼이 눌리면 해당 댓글에 좋아요가 +1, 또 눌리면 -1(좋아요 취소)이 되게 하는 함수
export const plusCommentThumbCount = (commentState, specificComment, currentUserState) => {
  const { comment } = commentState;
  const { id } = currentUserState;
  return {
    ...commentState,
    comment: comment.map((c) =>
      (c !== specificComment ? c
        : c.commentThumbCount.includes(id)
          ? { ...c, commentThumbCount: c.commentThumbCount.filter((v) => v !== id) }
          : { ...c, commentThumbCount: [...c.commentThumbCount, id] })),
  };
};

// 친구 추가 함수
export const addFriend = (currentUserState, specificId) => {
  const { friends } = currentUserState;

  return {
    ...currentUserState,
    friends: [...friends,
      specificId,
    ],
  };
};

// 친구 해제 함수
export const removeFriend = (currentUserState, specificId) => {
  const { friends } = currentUserState;

  return {
    ...currentUserState,
    friends: friends.filter((v) => v !== specificId),
  };
};

// users.id를 users.userName으로 변경해주는 함수
export const changeIdToName = (id, loginState) => {
  const { users } = loginState;
  let returnName = '';

  for (let i = 0; i < users.length; i += 1) {
    if (id === users[i].id) {
      returnName = users[i].userName;
    }
  }
  return returnName;
};

// 게시글 수정"창"을 여는 함수
export const openPostEditBox = (postState, specificPost) => {
  const { post } = postState;

  return ({
    ...postState,
    post: post.map((p) =>
      (p.uniqueKey !== specificPost.uniqueKey ? p : { ...p, isEditButtonClicked: true })),
  });
};

// 대댓글"창"을 여는 함수
export const openChildCommentBox = (commentState, specificComment) => {
  const { comment } = commentState;

  return (
    {
      ...commentState,
      comment: comment.map((v) =>
        (specificComment.uniqueKey !== v.uniqueKey
          ? v : { ...v, isChildCommentFunctionOn: true })),
    }
  );
};