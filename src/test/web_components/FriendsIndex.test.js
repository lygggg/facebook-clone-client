import FriendsIndex from "../../web_components/FriendsIndex";
import React from "react";
import {shallow} from 'enzyme';

describe('FriendsIndex', () => {
  let loginState;
  let currentUserState;
  let topLevelState;
  let setTopLevelState;
  let socket;

  beforeEach(() => {
    loginState = { users: [] };
    currentUserState = { id: 'Random_ID', friends: [] };
  });

  it('renders well', () => {
    const component = shallow(
      <FriendsIndex
        loginState={loginState}
        currentUserState={currentUserState}
        topLevelState={topLevelState}
        setTopLevelState={setTopLevelState}
        socket={socket}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
