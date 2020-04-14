import MyPageTop from "../../web_components/MyPageTop";
import React from "react";
import {render} from 'enzyme';

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
    const component = render(
      <MyPageTop
        currentUserState={currentUserState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('타임라인');
    expect(component.text()).toMatch('정보');
    expect(component.text()).toMatch('친구');
    expect(component.text()).toMatch('스크랩');
  });
});
