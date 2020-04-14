import Advertisement from "../../web_components/Advertisement";
import React from 'react';
import {render} from 'enzyme';

describe('Advertisement', () => {
  it('renders well', () => {
    const component = render(
      <Advertisement />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Sponsored');
  });
});
