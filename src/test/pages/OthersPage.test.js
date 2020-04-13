import OthersPage from "../../pages/OthersPage";
import React from "react";
import {shallow} from 'enzyme';

describe('OthersPage', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let commentState;
  let setCommentState;
  let postState;
  let setPostState;
  let topLevelState;
  let setSearchState;

  beforeEach(() => {
    postState = { post: [] };
    loginState = { users: [] };
  });

  it('renders well', () => {
    const component = shallow(
      <OthersPage
        specificPost={topLevelState}
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
        postState={postState}
        setPostState={setPostState}
        commentState={commentState}
        setCommentState={setCommentState}
        setSearchState={setSearchState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
