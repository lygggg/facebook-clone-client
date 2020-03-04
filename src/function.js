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
  login as apiLogin,
  destroySession as apiDistroySession,
  checkSessionExist as apiCheckSessionExist,
} from './apis/service';

// 세션이 이미 있는지 확인
export const checkSessionExist = async () => {
  try {
    return await apiCheckSessionExist();
  } catch (e) {
    console.error(e);
  }
};

// 세션 제거
export const destroySession = async () => {
  try {
    return await apiDistroySession();
  } catch (e) {
    console.error(e);
  }
};

// 로그인
export const login = async (userID, userPW) => {
  try {
    return await apiLogin(userID, userPW);
  } catch (e) {
    console.error(e);
  }
};

// 유저 목록 불러오기
export const getUsers = async () => {
  try {
    return await apiGetUsers();
  } catch (e) {
    console.error(e);
  }
};

// 회원가입
export const addUser = async (id, pw, userName) => {
  try {
    return await apiAddUser(id, pw, userName);
  } catch (e) {
    console.error(e);
  }
};

// 게시글 목록 불러오기
export const getPosts = async () => {
  try {
    return await apiGetPosts();
  } catch (e) {
    console.error(e);
  }
};

// 게시글 추가
export const addPost = async (id, name, contents) => {
  try {
    return await apiAddPost(id, name, contents);
  } catch (e) {
    console.error(e);
  }
};

// 게시글 삭제
export const removePost = async (uniqueKey) => {
  try {
    return await apiRemovePost(uniqueKey);
  } catch (e) {
    console.error(e);
  }
};

// 게시글 수정
export const editPost = async (uniqueKey, editedContents) => {
  try {
    return await apiEditPost(uniqueKey, editedContents);   
  } catch (e) {
    console.error(e);
  }
};

// 게시글 좋아요
export const plusThumbCount = async (uniqueKey, userId) => {
  try {
    return await apiPlusThumbCount(uniqueKey, userId); 
  } catch (e) {
    console.error(e);
  }
}

// 게시글 스크랩
export const addScrap = async (whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey) => {
  try {
    return await apiAddScrap(whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey); 
  } catch (e) {
    console.error(e);
  }
};

// 댓글 목록 불러오기
export const getComments = async () => {
  try {   
    return await apiGetComments();
  } catch (e) {
    console.error(e);
  }
};

// 댓글 추가
export const addComment = async (id, userId, username, commentContents) => {
  try {   
    return await apiAddComment(id, userId, username, commentContents);
  } catch (e) {
    console.error(e);
  }
};

// 댓글 추가시 댓글 개수 +1
export const plusCommentCount = async (uniqueKey) => {
  try {  
    return await apiPlusCommentCount(uniqueKey);
  } catch (e) {
    console.error(e);
  }
}

// 댓글 좋아요
export const plusCommentThumbCount = async (uniqueKey, userId) => {
  try {  
    return await apiPlusCommentThumbCount(uniqueKey, userId);
  } catch (e) {
    console.error(e);
  }  
}

// 대댓글 추가
export const addChildComment = async (uniqueKey, contents, userId, userName) => {
  try {
    return await apiAddChildComment(uniqueKey, contents, userId, userName);  
  } catch (e) {
    console.error(e);
  }
}

// 친구 추가
export const addFriend = async (currentUserID, friendID) => {
  try {  
    return await apiAddFriend(currentUserID, friendID);
  } catch (e) {
    console.error(e);
  }
}

// 친구 해제
export const removeFriend = async (currentUserID, friendID) => {
  try {  
    return await apiRemoveFriend(currentUserID, friendID);
  } catch (e) {
    console.error(e);
  }
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