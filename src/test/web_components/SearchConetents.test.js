import SearchContents from "../../web_components/SearchContents";
import React from "react";
import {shallow} from 'enzyme';

describe('SearchContents', () => {
  let searchState;
  let setSearchState;
  let topLevelState;
  let setTopLevelState;
  let loginState;

  beforeEach(() => {
    searchState = {
      exist: true,
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
    const component = shallow(
      <SearchContents
        searchState={searchState}
        setSearchState={setSearchState}
        topLevelState={topLevelState}
        setTopLevelState={setTopLevelState}
        loginState={loginState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
