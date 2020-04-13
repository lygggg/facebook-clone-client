import React from 'react';
import {shallow} from 'enzyme';
import FriendsReco from "../../pages/FriendsReco";

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
     const component = shallow(
       <FriendsReco
         currentUserState={currentUserState}
         setCurrentUserState={setCurrentUserState}
         loginState={loginState}
         setLoginState={setLoginState}
         topLevelState={topLevelState}
         setTopLevelState={setTopLevelState}
         setSearchState={setSearchState}
       />
     );

    expect(component).toMatchSnapshot();
   });
});
