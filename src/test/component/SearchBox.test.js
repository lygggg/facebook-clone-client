import React from 'react';
import {render} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import SearchBox from "../../components/headers/SearchBox";

describe('SearchBox', () => {
  let loginState;
  let setLoginState;
  let setSearchState;

  beforeEach(() => {
    loginState = {
      users: [],
    }
  })

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <SearchBox
          loginState={loginState}
          setLoginState={setLoginState}
          setSearchState={setSearchState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.find('input')).toBeDefined();
  });
});
