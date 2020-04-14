import Post from "../../pages/Post";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

describe('Post', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let commentState;
  let setCommentState;
  let postState;
  let setPostState;
  let setTopLevelState;
  let topLevelState;
  let setSearchState;
  let socket;

  beforeEach(() => {
    postState = { post: [] };
    loginState = { users: [{ id: 'Random_ID' }], isLoggedIn: true };
    currentUserState = {
      id: 'Random_ID',
      friends: [],
    };
  });

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <Post
          postState={postState}
          setPostState={setPostState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          loginState={loginState}
          setLoginState={setLoginState}
          commentState={commentState}
          setCommentState={setCommentState}
          topLevelState={topLevelState}
          setTopLevelState={setTopLevelState}
          setSearchState={setSearchState}
          socket={socket}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('게시물 만들기');
    expect(component.text()).toMatch('무슨 생각을 하고 계신가요?');
    expect(component.text()).toMatch('게시');

  });
});
