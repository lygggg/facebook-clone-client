import Counter from './components/Counter';
/* ****************************************************** */
import {
  getUsers as apiGetUsers,
  addUser as apiAddUser,
  getPosts as apiGetPosts,
  addPost as apiAddPost,
  removePost as apiRemovePost,
  editPost as apiEditPost,
} from './apis/service';

// 유저 목록 불러오기
export const getUsers = async () => {
  return await apiGetUsers();
}

// 회원가입
export const addUser = async (id, pw, userName) => {
  return await apiAddUser(id, pw, userName);
}

// 게시글 목록 불러오기
export const getPosts = async () => {
  return await apiGetPosts();
}

// 게시글 추가
export const addPost = async (id, name, contents) => {
  return await apiAddPost(id, name, contents);
}

// 게시글 삭제
export const removePost = async (uniqueKey) => {
  return await apiRemovePost(uniqueKey);
}

// 게시글 수정
export const editPost = async (uniqueKey, temptState) => {
  return await apiEditPost(uniqueKey, temptState);
}

/* ****************************************************** */

// 게시글 스크랩 함수
export const scrapPost = (postState, specificPost, currentUserState) => {
  const { scrap, post } = postState;
  const { id, userName } = currentUserState;
  const userID = id;

  return {
    ...postState,
    scrap: [...scrap,
      {
        uniqueKey: Counter(),
        id: userID, // 스크랩 한 사람의 id
        whoDid: userName, // 스크랩 한 사람의 name
        name: specificPost.name, // 피게시글을 쓴 User의 이름
        contents: specificPost.contents, // 피게시글의 내용
      },
    ],
    post: post.map((v) =>
      (v.uniqueKey !== specificPost.uniqueKey ? v : { ...v, sharingCount: v.sharingCount + 1 })),
  };
};

// 게시글 수정"창"을 열고 닫는 함수
export const onOffPostEditBox = (postState, specificPost, num) => {
  const { post } = postState;
  let bool = false;

  if (num === 1) {
    bool = true;
  }

  return ({
    ...postState,
    post: post.map((p) =>
      (p.uniqueKey !== specificPost.uniqueKey ? p : { ...p, isEditButtonClicked: bool })),
  });
};

// 게시글 수정"창"을 모두 닫는 함수 (로그인 시에 사용)
export const closeAllPostEditBox = (postState, justTrue) => {
  const { post } = postState;

  return ({
    ...postState,
    post: post.map((v) => (justTrue ? { ...v, isEditButtonClicked: false } : justTrue)),
  });
};

// 댓글 추가 함수
export const addComment = (commentState, specificPost, temptState, userName, userID) => {
  const { comment } = commentState;

  return {
    ...commentState,
    comment: [...comment,
      {
        uniqueKey: Counter(),
        id: specificPost.uniqueKey, // 어떤 게시글에 달린 댓글인지 확인하기 위한 것
        writerID: userID, // 댓글 쓰는 사람의 ID
        writer: userName, // 댓글 쓰는 사람의 이름
        statement: temptState, // 댓글 내용
        childComment: [],
        isChildCommentFunctionOn: false,
        commentThumbCount: [], // 댓글의 좋아요 개수
      },
    ],
  };
};

// 대댓글 추가 함수
export const addChildComment = (commentState, temptState, userID, userName, parentsComment) => {
  const { comment } = commentState;
  const { childComment } = parentsComment;

  return {
    ...commentState,
    comment: comment.map((v) =>
      (parentsComment.uniqueKey !== v.uniqueKey ? v
        : {
          ...v,
          childComment: [...childComment,
            { id: userID, name: userName, statement: temptState }],
        })),
  };
};

// 대댓글"창"을 열고 닫는 함수
export const onOffChildCommentBox = (commentState, specificComment, num) => {
  const { comment } = commentState;
  let bool = false;

  if (num === 1) {
    bool = true;
  }

  return (
    {
      ...commentState,
      comment: comment.map((v) =>
        (specificComment.uniqueKey !== v.uniqueKey
          ? v : { ...v, isChildCommentFunctionOn: bool })),
    }
  );
};

// 대댓글"창" 모두 닫는 함수 (로그인 시에 사용)
export const closeAllChildCommentBox = (commentState, justTrue) => {
  const { comment } = commentState;

  return (
    {
      ...commentState,
      comment: comment.map((v) =>
        (justTrue ? { ...v, isChildCommentFunctionOn: false } : justTrue)),
    }
  );
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

// 게시글: 좋아요 버튼이 눌리면 해당 게시글의 좋아요가 +1, 또 눌리면 -1(좋아요 취소)이 되게 하는 함수
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
