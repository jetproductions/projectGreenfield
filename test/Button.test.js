/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Button from '../src/components/utility/Button';


const renderer = TestRenderer.ReactTestRenderer;
const instance = TestRenderer.ReactTestInstance;
describe('<Button /> Testing', () => {
  it('renders Button without crashing', () => shallow(<Button />));
});
