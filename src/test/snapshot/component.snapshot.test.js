import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import AddPost from '../../components/posts/AddPost';
import PostEditBox from "../../components/posts/PostEditBox";
import ShowPostOthersPage from "../../components/posts/ShowPost";
import ShowPostHome from "../../components/posts/ShowPostHome";
import FriendsState from "../../components/headers/FriendsState";
import HomeHeader from "../../components/headers/HeaderHome";
import MyPageHeader from "../../components/headers/HeaderMyPage";
import OtherspageHeader from "../../components/headers/HeaderOthersPage";
import HeaderOthersPage from "../../components/headers/HeaderOthersPage";
import SearchBox from "../../components/headers/SearchBox";
import Comment from "../../components/comments/Comment";
import ChildCommentBox from "../../components/comments/ChildCommentBox";
import Chatting from "../../components/Chatting";

describe('Snapshot test', () => {
  let currentUserState;
  let setCurrentUserState;
  let postState;
  let setPostState;
  let specificPost;
  let commentState;
  let setCommentState;
  let loginState;
  let setLoginState;
  let setTopLevelState;
  let setSearchState;
  let setIsChattingOn;
  let userSocketID;
  let setUserSocketID;
  let friendID;
  let setFriendID;
  let socket;
  let p;
  let index;

  beforeEach(() => {
    specificPost = {
      id: 'TEST',
      name: 'TEST'
    };
    currentUserState = {
      id: 'TEST',
      pw: 'TEST',
      userName: 'TEST',
      friends: []
    };
    loginState = {
      users: [ { id: 'TEST' }]
    };
    commentState = {
      comment: []
    };
    index = 100;
    p = {
      time: [2020, 4, 21, 5, 16],
      thumbCount: [],
    };
    friendID = 'TEST';
  });


  describe('Chatting', () => {
    it('renders well', () => {
      const component = shallow(
        <Chatting
          setIsChattingOn={setIsChattingOn}
          currentUserState={currentUserState}
          socket={socket}
          userSocketID={userSocketID}
          setUserSocketID={setUserSocketID}
          loginState={loginState}
          friendID={friendID}
          setFriendID={setFriendID}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('ChildCommentBox', () => {
    it('renders well', () => {
      const component = shallow(
        <ChildCommentBox
          commentState={commentState}
          setCommentState={setCommentState}
          parentsComment={p}
          currentUserState={currentUserState}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('Comment', () => {
    it('renders well', () => {
      const component = shallow(
        <Comment
          specificPost={p}
          setPostState={setPostState}
          postState={postState}
          currentUserState={currentUserState}
          commentState={commentState}
          setCommentState={setCommentState}
          loginState={loginState}
          setLoginState={setLoginState}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('SearchBox', () => {
   it('renders well', () => {
     const component = shallow(
       <BrowserRouter>
         <SearchBox
           loginState={loginState}
           setLoginState={setLoginState}
           setSearchState={setSearchState}
         />
       </BrowserRouter>
     );

     expect(component).toMatchSnapshot();
   });
  });

  describe('HeaderOthersPage', () => {
    it('renders well', () => {
      const component = shallow(
        <BrowserRouter>
          <HeaderOthersPage
            loginState={loginState}
            setLoginState={setLoginState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        </BrowserRouter>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('OtherspageHeader', () => {
    it('renders well', () => {
      const component = shallow(
        <BrowserRouter>
          <OtherspageHeader
            loginState={loginState}
            setLoginState={setLoginState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        </BrowserRouter>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('MyPageHeader', () => {
    it('renders well', () => {
      const component = shallow(
        <BrowserRouter>
          <MyPageHeader
            loginState={loginState}
            setLoginState={setLoginState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        </BrowserRouter>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('HomeHeader', () => {
    it('renders well', () => {
      const components = shallow(
        <BrowserRouter>
          <HomeHeader
            loginState={loginState}
            setLoginState={setLoginState}
            currentUserState={currentUserState}
            setCurrentUserState={setCurrentUserState}
          />
        </BrowserRouter>
      )

      expect(components).toMatchSnapshot();
    })
  })

  describe('FriendsState', () => {
    it('renders well', () => {
      const component = shallow(
        <FriendsState
          specificPost={specificPost}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          loginState={loginState}
          setLoginState={setLoginState}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('AddPost', () => {
    it('renders well', () => {
      const component = shallow(
        <AddPost
          currentUserState={currentUserState}
          postState={postState}
          setPostState={setPostState}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('PostEditBox', () => {
    it('renders well', () => {
      const component = shallow(
        <PostEditBox
          specificPost={specificPost}
          postState={postState}
          setPostState={setPostState}
          currentUserState={currentUserState}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('ShowPostOthersPage', () => {
    it('renders well', () => {
      const component = shallow(
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
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('ShowPostHome', () => {
    it('renders well', () => {
      const component = shallow(
        <BrowserRouter>
          <ShowPostHome
            postState={postState}
            setPostState={setPostState}
            currentUserState={currentUserState}
            commentState={commentState}
            setCommentState={setCommentState}
            setTopLevelState={setTopLevelState}
            specificPost={p}
            index={index}
            loginState={loginState}
            setLoginState={setLoginState}
          />
        </BrowserRouter>
      );

      expect(component).toMatchSnapshot();
    });
  });

});
