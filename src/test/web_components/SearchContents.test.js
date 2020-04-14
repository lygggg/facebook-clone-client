import SearchContents from "../../web_components/SearchContents";
import React from "react";
import {render} from 'enzyme';

describe('SearchContents', () => {
  let searchState;
  let setSearchState;
  let topLevelState;
  let setTopLevelState;
  let loginState;

  beforeEach(() => {
    searchState = {
      exist: false,
      contents: [],
    };
    loginState = {
      users: [
        {
          id: 'Random_ID',
          profile: 'path',
          userName: 'Woomin',
        }
      ]
    };
  });

  it('renders well', () => {
    const component = render(
      <SearchContents
        searchState={searchState}
        setSearchState={setSearchState}
        topLevelState={topLevelState}
        setTopLevelState={setTopLevelState}
        loginState={loginState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('해당 유저가 존재하지 않습니다');
  });
});
