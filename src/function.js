import {
  getUsers as apiGetUsers,
  addUser as apiAddUser,
  getPosts as apiGetPosts,
  addPost as apiAddPost,
  removePost as apiRemovePost,
  editPost as apiEditPost,
  plusThumbCount as apiPlusThumbCount,
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
  addProfileImage as apiAddProfileImage,
  fileUpload as apiFileUpload,
  getUserSocketID as apiGetUserSocketID,
} from './apis/service';


const func = {

  // 유저의 socket.id 가져오기
  async getUserSocketID(userID) {
    try {
      return await apiGetUserSocketID(userID);
    } catch (e) {
      console.error(e);
    }
  },

  // 파일 업로드
  async fileUpload(formData) {
    try {
      return await apiFileUpload(formData);
    } catch (e) {
      console.error(e);
    }
  },

  // 프로필 사진 추가
  async addProfileImage(userId, filePath) {
    try {
      return await apiAddProfileImage(userId, filePath);
    } catch (e) {
      console.error(e);
    }
  },

  // 세션이 이미 있는지 확인
  async checkSessionExist() {
    try {
      return await apiCheckSessionExist();
    } catch (e) {
      console.error(e);
    }
  },

  // 세션 제거
  async destroySession(userID) {
    try {
      return await apiDistroySession(userID);
    } catch (e) {
      console.error(e);
    }
  },

  // 로그인
  async login(userID, userPW, socketID) {
    try {
      return await apiLogin(userID, userPW, socketID);
    } catch (e) {
      console.error(e);
    }
  },

  // 유저 목록 불러오기
  async getUsers() {
    try {
      return await apiGetUsers();
    } catch (e) {
      console.error(e);
    }
  },

  // 회원가입
  async addUser(id, pw, userName, birth, location, email, profile) {
    try {
      return await apiAddUser(id, pw, userName, birth, location, email, profile);
    } catch (e) {
      console.error(e);
    }
  },

  // 게시글 목록 불러오기
  async getPosts() {
    try {
      return await apiGetPosts();
    } catch (e) {
      console.error(e);
    }
  },

  // 게시글 추가
  async addPost(id, name, contents, profile, imagePath, time) {
    try {
      return await apiAddPost(id, name, contents, profile, imagePath, time);
    } catch (e) {
      console.error(e);
    }
  },

  // 게시글 삭제
  async removePost(uniqueKey) {
    try {
      return await apiRemovePost(uniqueKey);
    } catch (e) {
      console.error(e);
    }
  },

  // 게시글 수정
  async editPost(uniqueKey, editedContents) {
    try {
      return await apiEditPost(uniqueKey, editedContents);
    } catch (e) {
      console.error(e);
    }
  },

  // 게시글 좋아요
  async plusThumbCount(uniqueKey, userId) {
    try {
      return await apiPlusThumbCount(uniqueKey, userId);
    } catch (e) {
      console.error(e);
    }
  },

  // 댓글 목록 불러오기
  async getComments() {
    try {
      return await apiGetComments();
    } catch (e) {
      console.error(e);
    }
  },

  // 댓글 추가
  async addComment(id, userId, username, commentContents) {
    try {
      return await apiAddComment(id, userId, username, commentContents);
    } catch (e) {
      console.error(e);
    }
  },

  // 댓글 추가시 댓글 개수 +1
  async plusCommentCount(uniqueKey) {
    try {
      return await apiPlusCommentCount(uniqueKey);
    } catch (e) {
      console.error(e);
    }
  },

  // 댓글 좋아요
  async plusCommentThumbCount(uniqueKey, userId) {
    try {
      return await apiPlusCommentThumbCount(uniqueKey, userId);
    } catch (e) {
      console.error(e);
    }
  },

  // 대댓글 추가
  async addChildComment(uniqueKey, contents, userId, userName) {
    try {
      return await apiAddChildComment(uniqueKey, contents, userId, userName);
    } catch (e) {
      console.error(e);
    }
  },

  // 친구 추가
  async addFriend(currentUserID, friendID) {
    try {
      return await apiAddFriend(currentUserID, friendID);
    } catch (e) {
      console.error(e);
    }
  },

  // 친구 해제
  async removeFriend(currentUserID, friendID) {
    try {
      return await apiRemoveFriend(currentUserID, friendID);
    } catch (e) {
      console.error(e);
    }
  },

  /*
  ---------------------------------------------------------------
  여기부터는 Frontend 함수들 ↓
  */

  // 게시글 수정"창"을 여는 함수
  openPostEditBox(postState, specificPost) {
    const {post} = postState;

    return ({
      ...postState,
      post: post.map((p) => (p.uniqueKey !== specificPost.uniqueKey
        ? p : {...p, isEditButtonClicked: true})),
    });
  },

  // 대댓글"창"을 여는 함수
  openChildCommentBox(commentState, specificComment) {
    const {comment} = commentState;

    return (
      {
        ...commentState,
        comment: comment.map((v) => (specificComment.uniqueKey !== v.uniqueKey
          ? v : {...v, isChildCommentFunctionOn: true})),
      }
    );
  },

  // 현재 시간 가져오는 함수
  getCurrentTime() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return [year, month, day, hour, minute];
  },

  // id만 가지고 user 객체를 받아오는 함수
  findUserById(users, userID) {
    return users.find(({id}) => userID === id);
  }
};

export default func;
