/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Answer from '../src/components/question-answer/Answers/Answer';
import Photos from '../src/components/question-answer/Answers/Photos';

const importData = require('../sampleData/qAndA/answers');

describe('<Answer /> Testing Suite', () => {
  const data = importData.default.results[1];
  const shallowTest = shallow(<Answer {...data} />);
  const mountTest = mount(<Answer {...data} />);
  it('renders without crashing SHALLOW', async () => {
    await expect(shallowTest.hasClass('single-answer')).toBe(true);
  });
  it('renders without crashing MOUNT', async () => {
    await expect(mountTest.find('.single-answer').hasClass('single-answer')).toBe(true);
  });
  it('contains a Photos Component', async () => {
    await expect(mountTest.containsMatchingElement(<Photos photos={data.photos} />)).toBe(true);
  });
  it('has a prop for body', async () => {
    await expect(mountTest.prop('body')).toBe(data.body);
  });
  it('has a prop for answer_id', async () => {
    await expect(mountTest.prop('answer_id')).toBe(data.answer_id);
  });
  it('has a prop for date', async () => {
    await expect(mountTest.prop('date')).toBe(data.date);
  });
});
