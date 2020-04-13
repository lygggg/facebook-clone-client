import Advertisement from "../../web_components/Advertisement";
import React from 'react';
import {shallow} from 'enzyme';

describe('Advertisement', () => {
  it('renders well', () => {
    const component = shallow(
      <Advertisement />
    );

    expect(component).toMatchSnapshot();
  });
});
