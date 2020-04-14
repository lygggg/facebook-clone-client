import MyPageSide from "../../web_components/MyPageSide";
import React from "react";
import {render} from 'enzyme';

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
    const component = render(
      <MyPageSide
        currentUserState={currentUserState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('소개');
    expect(component.text()).toMatch('간단한 소개를 추가하여 회원님에 대해 자세히 알려주세요');
    expect(component.text()).toMatch('1996-04-21');
    expect(component.text()).toMatch('대한민국');
    expect(component.text()).toMatch('dal96k@hanmail.net');
  });
});
