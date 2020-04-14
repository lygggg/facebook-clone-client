import Login from "../../pages/Login";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

describe('Login', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let commentState;
  let setCommentState;
  let postState;
  let setPostState;
  let socket;

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <Login
          loginState={loginState}
          setLoginState={setLoginState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          commentState={commentState}
          setCommentState={setCommentState}
          postState={postState}
          setPostState={setPostState}
          socket={socket}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('아이디');
    expect(component.text()).toMatch('비밀번호');
    expect(component.text()).toMatch('회원이 아니신가요?');
    expect(component.text()).toMatch('Facebook');
  });
});
