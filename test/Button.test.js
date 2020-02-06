/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from '../src/components/utility/Button';

// this connects Enzyme
configure({ adapter: new Adapter() });

describe('<Button /> Testing', () => {
  it('should render the button utility', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find(button)).toHaveLength(1);
  });
});
