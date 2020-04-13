import Header from "../../web_components/Header";
import React from "react";
import {shallow} from 'enzyme';

describe('Header', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let setCurrentUserState;
  let setSearchState;

  it('renders well', () => {
    const component = shallow(
      <Header
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
        setSearchState={setSearchState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
