/* eslint-disable no-undef */

const sum = require('../src/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

const subtract = jest.fn((a, b) => a - b);

test('subtracts A and B using Mock', () => {
  expect(subtract(2, 1)).toBe(1);
  expect(subtract).toHaveBeenCalledTimes(1);
  expect(subtract).toHaveBeenCalledWith(2, 1);
});

// const Hello = (<h1>Hello</h1>);
// describe('<Hello/>', () => {
//   it('renders one <h1> tag', () => {
//     const wrapper = shallow(<Hello />);
//     expect(wrapper.find('h1')).to.have.length(1);
//   });
// });
