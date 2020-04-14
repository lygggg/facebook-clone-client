import Join from "../../pages/Join";
import React from "react";
import {render} from 'enzyme';

describe('Join', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;

  beforeEach(() => {
    currentUserState = { id: 'Random_ID' };
    loginState = { users: [] };
  });

  it('renders well', () => {
    const component = render(
      <Join
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('가입하기');
    expect(component.text()).toMatch('새로운 아이디');
    expect(component.text()).toMatch('이름');
    expect(component.text()).toMatch('생년월일');
    expect(component.text()).toMatch('거주지');
    expect(component.text()).toMatch('이메일');
    expect(component.text()).toMatch('프로필');
  });
})
