/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import QuestionSearch from '../src/components/question-answer/SearchBar';

describe('<SearchBar /> Test Suite', () => {
  it('should render an input field', () => {
    expect(shallow(<QuestionSearch />).is('input')).toBe(true);
  });
  it('should be selectable by class search-bar', () => {
    expect(shallow(<QuestionSearch />).hasClass('search-bar')).toBe(true);
  });
  // figure out how to test using mount() for full component with stubbed data
  it('should have a placeholder', () => {
    expect(mount(<QuestionSearch />).find('placeholder')).toBeTruthy();
  });
  // trying to find placeholder text within component rendered
  // it('placeholder should be "HAVE A QUESTION? SEARCH FOR ANSWERS..."', () => {
  //   expect(mount(<QuestionSearch />).find('placeholder').props()).toBeTruthy();
  // });
});
