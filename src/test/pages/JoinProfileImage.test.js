import JoinProfileImage from "../../pages/JoinProfileImage";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

describe('JoinProfileImage', () => {
  let currentUserState;
  let setCurrentUserState;

  beforeEach(() => {
    currentUserState = { id: 'Woomin' };
  });

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <JoinProfileImage
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('다음');
  });
});
