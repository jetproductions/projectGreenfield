/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '../src/components/utility/Button';

describe('<Button /> Testing', () => {
  const name = 'name';
  it('should be a button element', () => {
    expect(shallow(<Button name={name} />).is('button')).toBeTruthy();
  });
  it('should be selectable by utility-button class', () => {
    expect(shallow(<Button name={name} />).is('.utility-button')).toBe(true);
  });
  // working on getting full button to mount and test
  // it('mounts the full Button', () => {
  //   expect(mount(<Button name={name} submitHandler={e => console.log(e.target.value)} />).is('.utility-button')).toBe(true);
  // });
});
