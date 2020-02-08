/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Photos from '../src/components/question-answer/Answers/Photos';

describe('<AnswerPhotos /> Testing', () => {
  const stubPhoto = [{
    id: 3213,
    url: 'https://images.unsplash.com/photo-1544568104-5b7eb8189dd4?ixlib=rb-1.2.1&dpr=2&auto=format&fit=crop&w=416&h=312&q=60'
  }];
  it('Renders a photo when given a URL', () => {
    expect(shallow(<Photos photos={stubPhoto} />).is('.answer-photos')).toBe(true);
  });
});
