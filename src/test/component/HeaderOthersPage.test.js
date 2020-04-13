import React from 'react';
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import OtherspageHeader from "../../components/headers/HeaderOthersPage";

describe('OtherspageHeader', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let setCurrentUserState;

  it('renders well', () => {
    const component = shallow(
      <BrowserRouter>
        <OtherspageHeader
          loginState={loginState}
          setLoginState={setLoginState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
