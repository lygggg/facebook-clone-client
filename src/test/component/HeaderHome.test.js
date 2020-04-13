import React from 'react';
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import HomeHeader from "../../components/headers/HeaderHome";

describe('HomeHeader', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let setCurrentUserState;

  it('renders well', () => {
    const components = shallow(
      <BrowserRouter>
        <HomeHeader
          loginState={loginState}
          setLoginState={setLoginState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
        />
      </BrowserRouter>
    )

    expect(components).toMatchSnapshot();
  })
})
