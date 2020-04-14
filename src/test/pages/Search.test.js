import Search from "../../pages/Search";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

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
    currentUserState = {
      userName: 'Woomin',
      profile: 'path',
    };
    searchState = {
      exist: false,
    }
  });

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
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
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('해당 유저가 존재하지 않습니다');
  });
});
