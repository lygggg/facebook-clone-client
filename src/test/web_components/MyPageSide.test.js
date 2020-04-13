import MyPageSide from "../../web_components/MyPageSide";
import React from "react";
import {shallow} from 'enzyme';

describe('MyPageSide', () => {
  let currentUserState;

  beforeEach(() => {
    currentUserState = {
      birth: '1996-04-21',
      location: '대한민국',
      email: 'dal96k@hanmail.net',
    }
  });

  it('renders well', () => {
    const component = shallow(
      <MyPageSide
        currentUserState={currentUserState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
