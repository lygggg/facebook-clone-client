import FriendsIndex from "../../web_components/FriendsIndex";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

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
    const component = render(
      <BrowserRouter>
        <FriendsIndex
          loginState={loginState}
          currentUserState={currentUserState}
          topLevelState={topLevelState}
          setTopLevelState={setTopLevelState}
          socket={socket}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('알 수도 있는 사람');
    expect(component.text()).toMatch('친구');
  });
});
