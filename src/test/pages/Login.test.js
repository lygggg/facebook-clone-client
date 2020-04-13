import Login from "../../pages/Login";
import React from "react";
import {shallow} from 'enzyme';
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
    const component = shallow(
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
  });
});
