import React from 'react';
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import MyPageHeader from "../../components/headers/HeaderMyPage";

describe('MyPageHeader', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let setCurrentUserState;

  it('renders well', () => {
    const component = shallow(
      <BrowserRouter>
        <MyPageHeader
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
