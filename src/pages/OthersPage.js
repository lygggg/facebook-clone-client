import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ShowPost from '../components/posts/ShowPost';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';
import FriendsState from '../components/headers/FriendsState';
import SearchBox from '../components/headers/SearchBox';
import { checkSessionExist } from '../function';

const callAPI = async (currentUserState, setCurrentUserState) => {
  const { user } = await checkSessionExist();

  setCurrentUserState({
    ...currentUserState,
    id: user.id,
    userName: user.userName,
    friends: user.friends,
    profile: user.profile,
  });
};

function OthersPage({
  specificPost,
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
  postState,
  setPostState,
  commentState,
  setCommentState,
  setSearchState,
}) {
  const { post } = postState;
  const { id } = specificPost;
  const userId = currentUserState.id;

  useEffect(() => {
    callAPI(currentUserState, setCurrentUserState);
  }, []);

  return (
    <>
      <SearchBox
        loginState={loginState}
        setLoginState={setLoginState}
        setSearchState={setSearchState}
      />
      <HeaderOthersPage
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
      {id === userId
        ? (
          <Redirect to="/mypage" />
        )
        : (
          <FriendsState
            specificPost={specificPost}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
            loginState={loginState}
            setLoginState={setLoginState}
          />
        )}
      <div>
        {post.filter((v) => v.id === specificPost.id).length === 0
          ? <div className="no-post">게시글이 없습니다</div>
          : post.filter((v) => v.id === specificPost.id).map((p, index) => (
            <div key={index}>
              <ShowPost
                postState={postState}
                setPostState={setPostState}
                currentUserState={currentUserState}
                commentState={commentState}
                setCommentState={setCommentState}
                p={p}
                index={index}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default OthersPage;
