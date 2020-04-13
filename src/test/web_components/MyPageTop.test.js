import MyPageTop from "../../web_components/MyPageTop";
import React from "react";
import {shallow} from 'enzyme';

describe('MyPageTop', () => {
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
      <MyPageTop
        currentUserState={currentUserState}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
