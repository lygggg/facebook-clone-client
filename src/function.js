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
  plusCommentThumbCount as apiPlusCommentThumbCount,
  addChildComment as apiAddChildComment,
  addFriend as apiAddFriend,
  removeFriend as apiRemoveFriend,
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

// 댓글 좋아요
export const plusCommentThumbCount = async (uniqueKey, userId) => {
  return await apiPlusCommentThumbCount(uniqueKey, userId);
}

// 대댓글 추가
export const addChildComment = async (uniqueKey, contents, userId, userName) => {
  return await apiAddChildComment(uniqueKey, contents, userId, userName);
}

// 친구 추가
export const addFriend = async (currentUserID, friendID) => {
  return await apiAddFriend(currentUserID, friendID);
}

// 친구 해제
export const removeFriend = async (currentUserID, friendID) => {
  return await apiRemoveFriend(currentUserID, friendID);
}

/*
---------------------------------------------------------------
여기부터는 Frontend 함수들 ↓
*/

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