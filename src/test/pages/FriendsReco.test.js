import React from 'react';
import {render} from 'enzyme';
import FriendsReco from "../../pages/FriendsReco";
import {BrowserRouter} from "react-router-dom";

describe('FriendsReco', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let topLevelState;
  let setTopLevelState;
  let setSearchState;

  beforeEach(() => {
    currentUserState = { friends: [] };
    loginState = { users: [] };
  });

  it('renders well', () => {
     const component = render(
       <BrowserRouter>
         <FriendsReco
           currentUserState={currentUserState}
           setCurrentUserState={setCurrentUserState}
           loginState={loginState}
           setLoginState={setLoginState}
           topLevelState={topLevelState}
           setTopLevelState={setTopLevelState}
           setSearchState={setSearchState}
         />
       </BrowserRouter>
     );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('홈');
    expect(component.text()).toMatch('로그아웃');
    expect(component.text()).toMatch('알 수도 있는 사람');
   });
});
