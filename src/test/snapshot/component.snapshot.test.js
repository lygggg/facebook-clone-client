import React from 'react';
import { Route } from 'react-router-dom';
import { mount } from 'enzyme';
import AddPost from '../../components/posts/AddPost';
import PostEditBox from "../../components/posts/PostEditBox";
import ShowPostOthersPage from "../../components/posts/ShowPost";
import ShowPostHome from "../../components/posts/ShowPostHome";

describe('Snapshot test', () => {
  let currentUserState;
  let postState;
  let setPostState;
  let specificPost;
  let commentState;
  let setCommentState;
  let loginState;
  let setLoginState;
  let setTopLevelState;
  let p;
  let index;

  beforeEach(() => {
    currentUserState = { id: 'a'};
    loginState = { users: [] };
    commentState = { comment: [] };
    index = 100;
    p = {
      time: [1, 2, 3, 4, 5],
      thumbCount: [],
    };
  });

  /*
  describe('', () => {
    it('renders well', () => {
      const component = mount(
        <
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
  */

  describe('AddPost', () => {
    it('renders well', () => {
      const component = mount(
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
      const component = mount(
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
      const component = mount(
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
      const component = mount(
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
      );

      expect(component).toMatchSnapshot();
    });
  });

});
