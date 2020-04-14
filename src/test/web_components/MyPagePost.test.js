import MyPagePost from "../../web_components/MyPagePost";
import React from "react";
import {render} from 'enzyme';

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
    const component = render(
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
    expect(component.text()).toMatch('게시물 만들기');
    expect(component.text()).toMatch('무슨 생각을 하고 계신가요?');
    expect(component.text()).toMatch('게시');
  });
});
