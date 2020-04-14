import Header from "../../web_components/Header";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

describe('Header', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let setCurrentUserState;
  let setSearchState;

  beforeEach(() => {
    loginState = { users: [] };
    currentUserState = {
      userName: 'Woomin',
      profile: 'path',
    }
  })

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <Header
          loginState={loginState}
          setLoginState={setLoginState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          setSearchState={setSearchState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Woomin');
    expect(component.text()).toMatch('홈');
    expect(component.text()).toMatch('로그아웃');
  });
});
