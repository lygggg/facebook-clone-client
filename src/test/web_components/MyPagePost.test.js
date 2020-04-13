import MyPagePost from "../../web_components/MyPagePost";
import React from "react";
import {shallow} from 'enzyme';

describe('MyPagePost', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let postState;
  let setPostState;
  let commentState;
  let setCommentState;

  beforeEach(() => {
    postState = { post: [] };
    currentUserState = { id: 'Random_ID' };
  });

  it('renders well', () => {
    const component = shallow(
      <MyPagePost
        currentUserState={currentUserState}
        postState={postState}
        setPostState={setPostState}
        commentState={commentState}
        setCommentState={setCommentState}
        loginState={loginState}
        setLoginState={setLoginState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
