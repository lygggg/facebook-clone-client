import Search from "../../pages/Search";
import React from "react";
import {shallow} from 'enzyme';

describe('Search', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let postState;
  let topLevelState;
  let setTopLevelState;
  let searchState;
  let setSearchState;

  beforeEach(() => {
    postState = { post: [] };
    loginState = { users: [] };
  });

  it('renders well', () => {
    const component = shallow(
      <Search
        searchState={searchState}
        setSearchState={setSearchState}
        topLevelState={topLevelState}
        setTopLevelState={setTopLevelState}
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
