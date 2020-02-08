/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateAnswer } from '../src/components/question-answer/Answers/CreateAnswer';
import Product1 from '../sampleData/product/product';
import qaP1 from '../sampleData/qAndA/questions';

// this component is connected to redux store
describe('<Create Answer /> Testing', () => {
  let shallowTest;
  let mountTest;
  const question = qaP1.results[0];
  beforeEach(() => {
    shallowTest = shallow(<CreateAnswer product={Product1} question_id={question.question_id} question_body={question.question_body} toggleModal />);
    mountTest = mount(<CreateAnswer product={Product1} question_id={question.question_id} question_body={question.question_body} toggleModal />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', async () => {
    await expect(mountTest.find('.create-answer').hasClass('create-answer')).toBe(true);
  });
  it('has expected default state', async () => {
    await expect(mountTest.state('body')).toBe('');
    await expect(mountTest.state('name')).toBe('');
    await expect(mountTest.state('email')).toBe('');
    await expect(mountTest.state('photo')).toBe('');
    await expect(mountTest.state('photosToSend').length).toBe(0);
    await expect(mountTest.state('photos').length).toBe(0);
    await expect(mountTest.state('success')).toBe(false);
    await expect(mountTest.state('error')).toBe(false);
  });
});
