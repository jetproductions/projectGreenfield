/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Photos from '../src/components/question-answer/Answers/Photos';

const sampleData = require('../sampleData/qAndA/answers');

describe('<AnswerPhotos /> Testing', () => {
  const stubPhoto = [sampleData.default.results[1].photos[0]];
  const stubPhotos = sampleData.default.results[1].photos;
  const shallowPhotos = shallow(<Photos photos={stubPhoto} />);
  const mountPhotos = mount(<Photos photos={stubPhotos} />);
  it('Renders with a class answer-photos', () => {
    expect(shallowPhotos.hasClass('answer-photos')).toBe(true);
  });
  it('Renders an Array of Photos when given multiple URLs', () => {
    expect(mountPhotos.find('.answer-photos').children().length).toBe(stubPhotos.length);
  });
  it('Checks that Image is inside of <div />', () => {
    expect(mountPhotos.find('img').at(0).parent().is('div')).toBe(true);
  });
});
