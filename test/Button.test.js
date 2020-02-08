/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '../src/components/utility/Button';

describe('<Button /> Testing', () => {
  const name = 'name';
  it('should be a button element', () => {
    expect(shallow(<Button name={name} />).type()).toEqual('button');
  });
  it('should be selectable by utility-button class', () => {
    expect(shallow(<Button name={name} />).hasClass('utility-button')).toBe(true);
  });
  it('mounts the full Button', () => {
    expect(mount(<Button name={name} />).prop('name')).toBe('name');
  });
  // working on how to access type of a prop
  // it('takes a submitHandler Function', () => {
  //   expect(mount(<Button name={name} submitHandler={() => true} />).prop('submitHandler').type()).toBe('Function');
  // });
});
