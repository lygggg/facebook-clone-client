import JoinProfileImage from "../../pages/JoinProfileImage";
import React from "react";
import {shallow} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

describe('JoinProfileImage', () => {
  let currentUserState;
  let setCurrentUserState;

  it('renders well', () => {
    const component = shallow(
      <BrowserRouter>
        <JoinProfileImage
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
