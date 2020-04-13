import React from 'react';
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import SearchBox from "../../components/headers/SearchBox";

describe('SearchBox', () => {
  let loginState;
  let setLoginState;
  let setSearchState;

  it('renders well', () => {
    const component = shallow(
      <BrowserRouter>
        <SearchBox
          loginState={loginState}
          setLoginState={setLoginState}
          setSearchState={setSearchState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
