import React from 'react';
import {render} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import OtherspageHeader from "../../components/headers/HeaderOthersPage";

describe('OtherspageHeader', () => {
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
        <OtherspageHeader
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
