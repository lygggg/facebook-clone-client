import OthersPageSide from "../../web_components/OthersPageSide";
import React from "react";
import {render} from 'enzyme';

describe('OthersPageSide', () => {
  let loginState;
  let specificPost;

  beforeEach(() => {
    loginState = {
      users: [
        {
          id: 'Random_ID',
          birth: '1996-04-21',
          location: '대한민국',
          email: 'dal96k@hanmail.net'
        }
      ]
    };
    specificPost = {
      id: 'Random_ID'
    }
  });

  it('renders well', () => {
    const component = render(
      <OthersPageSide
        loginState={loginState}
        specificPost={specificPost}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('소개');
    expect(component.text()).toMatch('1996-04-21');
    expect(component.text()).toMatch('대한민국');
    expect(component.text()).toMatch('dal96k@hanmail.net');
  });
});
