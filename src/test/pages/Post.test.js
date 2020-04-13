import Post from "../../pages/Post";
import React from "react";
import {shallow} from 'enzyme';

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
    loginState = { users: [], isLoggedIn: true };
    currentUserState = { id: 'Random_ID' };
  });

  it('renders well', () => {
    const component = shallow(
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
    );

    expect(component).toMatchSnapshot();
  });
});
