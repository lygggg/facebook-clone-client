import React, { useEffect } from 'react';
import AddPost from '../components/posts/AddPost';
import ShowPostOthersPage from '../components/posts/ShowPost';
import HeaderMyPage from '../components/headers/HeaderMyPage';
import {checkSessionExist, getPosts} from '../function';
import SearchBox from '../components/headers/SearchBox';

const callAPI = async (postState, setPostState, currentUserState, setCurrentUserState) => {
  const { user } = await checkSessionExist();
  const { timeLinePosts } = await getPosts();

  setCurrentUserState({
    ...currentUserState,
    id: user.id,
    userName: user.userName,
    friends: user.friends,
    profile: user.profile,
    birth: user.birth,
    location: user.location,
    email: user.email,
  });

  setPostState({
    ...postState,
    post: [...timeLinePosts.reverse()],
  });
};

function MyPage({
  postState,
  setPostState,
  currentUserState,
  setCurrentUserState,
  loginState,
  setLoginState,
  commentState,
  setCommentState,
  setTopLevelState,
  setSearchState,
}) {
  const { id, profile, userName, birth, location, email } = currentUserState;
  const { post, scrap } = postState;

  useEffect(() => {
    callAPI(postState, setPostState, currentUserState, setCurrentUserState);
  }, []);

  return (
    <div className="mypage-grid">
      <div className="mypage-cover">
        <div className="mypage-cover-top">
          <img className="mypage-cover-profile-image" src={profile} />
          <span className="mypage-cover-username">{userName}</span>
        </div>
        <div className="mypage-cover-bottom">
          <button className="mypage-cover-word-timeline" type="button">타임라인</button>
          <button className="mypage-cover-word-information" type="button">정보</button>
          <button className="mypage-cover-word-friends" type="button">친구</button>
          <button className="mypage-cover-word-scrap" type="button">스크랩</button>
        </div>
      </div>
      <div className="header">
        <SearchBox
          loginState={loginState}
          setLoginState={setLoginState}
          setSearchState={setSearchState}
        />
        <HeaderMyPage
          loginState={loginState}
          setLoginState={setLoginState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
        />
      </div>
      <div className="mypage-timeline-grid">
        <div className="mypage-side-banner">
          <div>
            <i className="fas fa-globe-americas"></i>
            <span className="mypage-side-banner-introduce">소개</span>
            <div className="mypage-side-banner-utter">
              간단한 소개를 추가하여 회원님에 대해 자세히 알려주세요
            </div>
            <div className="mypage-user-information">
              <i className="fas fa-birthday-cake"></i>
              <div>{birth}</div> <br />
              <i className="fas fa-map-marker-alt"></i>
              <div>{location}</div> <br />
              <i className="far fa-envelope"></i>
              <div>{email}</div>
            </div>
          </div>
        </div>
        <div>
          <AddPost
            currentUserState={currentUserState}
            postState={postState}
            setPostState={setPostState}
          />
          <div>
            {post.filter((v) => v.id === id).map((p, index) => (
              <div key={index}>
                <ShowPostOthersPage
                  postState={postState}
                  setPostState={setPostState}
                  currentUserState={currentUserState}
                  commentState={commentState}
                  setCommentState={setCommentState}
                  p={p}
                  index={index}
                  loginState={loginState}
                  setLoginState={setLoginState}
                />
              </div>
            ))}
          </div>
          <div>
            {/*{scrap.filter((v) => v.id === id).map((p, index) => (*/}
            {/*  <div key={index}>*/}
            {/*    <Scrap*/}
            {/*      postState={postState}*/}
            {/*      currentUserState={currentUserState}*/}
            {/*      setTopLevelState={setTopLevelState}*/}
            {/*      p={p}*/}
            {/*      index={index}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*))}*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
