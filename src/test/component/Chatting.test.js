import React from 'react';
import {shallow} from "enzyme";
import Chatting from "../../components/Chatting";

describe('Snapshot test', () => {
  let currentUserState;
  let loginState;
  let setIsChattingOn;
  let userSocketID;
  let setUserSocketID;
  let friendID;
  let setFriendID;
  let socket;

  beforeEach(() => {
    loginState = {
      users: [{ id: 'Random_ID', userName: 'Woomin' }],
    };
    friendID = 'Random_ID';
  });

  it('renders well', () => {
    const component = shallow(
      <Chatting
        setIsChattingOn={setIsChattingOn}
        currentUserState={currentUserState}
        socket={socket}
        userSocketID={userSocketID}
        setUserSocketID={setUserSocketID}
        loginState={loginState}
        friendID={friendID}
        setFriendID={setFriendID}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('채팅방입니다');
    expect(component.find(".chatting-send-button").text()).toBe('전송');
  });
});
