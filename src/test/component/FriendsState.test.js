import React from 'react';
import {render} from "enzyme";
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
    loginState = {
      users: [
        {
          id: 'Random_ID',
          userName: 'Eunjoo',
        },
        {
          id: 'Random_ID_2',
          userName: 'Woomin',
        }
      ]
    };
    p = {
      time: [2020, 4, 21, 5, 16],
      thumbCount: [],
    };
  });

  describe('with not yet friend', () => {
    beforeEach(() => {
      currentUserState = {
        id: 'Random_ID_2',
        pw: 'Random_Password',
        userName: 'Woomin',
        friends: []
      };
    });

    it('renders 팔로우', ()=> {
      const component = render(
        <FriendsState
          specificPost={specificPost}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          loginState={loginState}
          setLoginState={setLoginState}
        />
      );

      expect(component).toMatchSnapshot();
      expect(component.text()).toMatch('팔로우');
    });
  });

  describe('with already friend', () => {
    beforeEach(() => {
      currentUserState = {
        id: 'Random_ID_2',
        pw: 'Random_Password',
        userName: 'Woomin',
        friends: ['Random_ID']
      };
    });

    it('renders 팔로우 해제', ()=> {
      const component = render(
        <FriendsState
          specificPost={specificPost}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          loginState={loginState}
          setLoginState={setLoginState}
        />
      );

      expect(component).toMatchSnapshot();
      expect(component.text()).toMatch('Eunjoo 님과 친구입니다');
      expect(component.text()).toMatch('팔로우 해제');
    });
  });

});
