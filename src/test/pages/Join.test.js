import Join from "../../pages/Join";
import React from "react";
import {shallow} from 'enzyme';

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
    const component = shallow(
      <Join
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
    );

    expect(component).toMatchSnapshot();
  });
})
