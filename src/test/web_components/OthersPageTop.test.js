import OthersPageTop from "../../web_components/OthersPageTop";
import React from "react";
import {shallow} from 'enzyme';

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
    const component = shallow(
      <OthersPageTop
        specificPost={specificPost}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
        loginState={loginState}
        setLoginState={setLoginState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
