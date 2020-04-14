import OthersPageTop from "../../web_components/OthersPageTop";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

describe('OthersPageTop', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let setCurrentUserState;
  let specificPost;

  beforeEach(() => {
    currentUserState = { id: 'Random_ID' };
    loginState = {
      users: [
        {
          id: 'Random_ID',
          profile: 'path',
          userName: 'Woomin',
        }
      ]
    };
    specificPost = { id: 'Random_ID' };
  });

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <OthersPageTop
          specificPost={specificPost}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          loginState={loginState}
          setLoginState={setLoginState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Woomin');
    expect(component.text()).toMatch('타임라인');
    expect(component.text()).toMatch('정보');
    expect(component.text()).toMatch('친구');
  });
});
