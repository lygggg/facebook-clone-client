import MyPage from "../../pages/MyPage";
import React from "react";
import {shallow} from 'enzyme';

describe('MyPage', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let commentState;
  let setCommentState;
  let postState;
  let setPostState;
  let setTopLevelState;
  let setSearchState;

  it('renders well', () => {
    const component = shallow(
      <MyPage
        postState={postState}
        setPostState={setPostState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
        loginState={loginState}
        setLoginState={setLoginState}
        commentState={commentState}
        setCommentState={setCommentState}
        setTopLevelState={setTopLevelState}
        setSearchState={setSearchState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
