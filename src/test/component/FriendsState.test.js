import React from 'react';
import {shallow} from "enzyme";
import FriendsState from "../../components/headers/FriendsState";

describe('FriendsState', () => {
  let currentUserState;
  let setCurrentUserState;
  let specificPost;
  let loginState;
  let setLoginState;
  let p;

  beforeEach(() => {
    specificPost = {
      id: 'Random_ID',
      name: 'Eunjoo'
    };
    currentUserState = {
      id: 'Random_ID_2',
      pw: 'Random_Password',
      userName: 'Woomin',
      friends: []
    };
    loginState = {
      users: [ { id: 'Random_ID_2' }]
    };
    p = {
      time: [2020, 4, 21, 5, 16],
      thumbCount: [],
    };
  });

  it('renders well', () => {
    const component = shallow(
      <FriendsState
        specificPost={specificPost}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
        loginState={loginState}
        setLoginState={setLoginState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.others-friend-add').text()).toBe('팔로우');
  });
});
