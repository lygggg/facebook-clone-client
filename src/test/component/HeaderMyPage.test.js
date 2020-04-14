import React from 'react';
import {render} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import MyPageHeader from "../../components/headers/HeaderMyPage";

describe('MyPageHeader', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let setCurrentUserState;

  beforeEach(() => {
    currentUserState = {
      userName: 'Woomin',
      profile: 'path',
    };
  });

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <MyPageHeader
          loginState={loginState}
          setLoginState={setLoginState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Woomin');
    expect(component.text()).toMatch('홈');
    expect(component.text()).toMatch('로그아웃');
  });
});
