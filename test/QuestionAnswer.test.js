/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { QuestionAnswer } from '../src/components/question-answer/QuestionAnswer';
import Product1 from '../sampleData/product/product';

describe('<QuestionAnswer /> Component', () => {
  let shallowTest;
  let mountTest;
  beforeEach(() => {
    shallowTest = shallow(<QuestionAnswer product={Product1} />);
    mountTest = mount(<QuestionAnswer product={Product1} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', async () => {
    await expect(mountTest.find('#questions-answers').hasClass('container')).toBe(true);
  });
});
