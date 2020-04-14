import JoinFollow from "../../pages/JoinFollow";
import React from "react";
import {render} from 'enzyme';

describe('JoinFollow', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let topLevelState;
  let setTopLevelState;

  beforeEach(() => {
    currentUserState = { id: 'Random_ID' }
  });

  it('renders well', () => {
    const component = render(
      <JoinFollow
        loginState={loginState}
        setLoginState={setLoginState}
        topLevelState={topLevelState}
        setTopLevelState={setTopLevelState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('facebook 팔로우하기');
  });
});
