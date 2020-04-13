import OthersPageSide from "../../web_components/OthersPageSide";
import React from "react";
import {shallow} from 'enzyme';

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
    const component = shallow(
      <OthersPageSide
        loginState={loginState}
        specificPost={specificPost}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
