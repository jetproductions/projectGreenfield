import React, { Component } from 'react';
import { connect } from 'react-redux';
import Star from '../../utility/stars/Star';
import ToggleButton from './ToggleButton';
import RangeSlider from './RangeSlider';

/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
class ReviewForm extends Component {
  ratings = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

  constructor(props) {
    super(props);
    const rating = [...new Array(5)].map((e) => 0);
    this.state = {
      form: {
        name: '',
        email: '',
        summary: '',
        body: '',
        rating,
        photos: [],
        recommend: true,
        characteristics: {},
      },
    };
  }

  fillStars = (index) => {
    const { form } = this.state;
    const next = index + 1;
    const filled = [...new Array(5)].map((e, i) => (i < next ? 1 : 0));
    this.setState({ form: { ...form, rating: filled } });
  }

  toggleRecommendation = (value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, recommend: value } });
  }

  setCharacteristic = (characteristic) => {
    const { form, form: { characteristics } } = this.state;
    this.setState({ form: { ...form, characteristics: { ...characteristics, ...characteristic } } });
  }

  handleInputChange = (e) => {
    const { target: { name, value } } = e;
    const { form } = this.state;
    this.setState({ form: { ...form, [name]: value } });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { create } = this.props;
    const { form, form: { rating, photos: photoList } } = this.state;
    const total = rating.reduce((a, c) => a + c);
    const photos = photoList.filter((photo) => photo.length);
    const review = { ...form, rating: total, photos };
    create(review);
  }

  addRow = () => {
    const { form, form: { photos } } = this.state;
    const added = [...photos, ''];
    this.setState({ form: { ...form, photos: added } });
  }

  updatePhoto = (e, i) => {
    const { form, form: { photos } } = this.state;
    const { target: { value } } = e;
    const added = [...photos];
    added[i] = value;
    this.setState({ form: { ...form, photos: added } });
  }

  render = () => {
    const { product: { name: productName }, characteristics: chars } = this.props;
    const charOptions = Object.keys(chars).map((key) => ([key, chars[key].id]));
    const {
      form: {
        rating, name, email, summary, body, photos,
      },
    } = this.state;
    const ratingIndex = rating.lastIndexOf(1);
    return (
      <form onSubmit={this.handleOnSubmit} className="w-full px-4 text-gray-700">
        <div className="flex flex-wrap -mx-4 mb-12">
          <div className="w-full px-4">
            <h1 className="text-2xl font-bold uppercase leading-normal">Write Your Review</h1>
            <h5 className="text-xl leading-none">
              About
              {` ${productName}`}
            </h5>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-full md:w-1/2 flex flex-wrap px-4">
            <div className="w-full items-center flex">
              <label className="block text-sm uppercase font-bold mb-1">
                Overall Rating
              </label>
            </div>
            <div className="w-full items-center flex">
              <div className="flex mr-6">
                {
                rating.map((percent, i) => (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.fillStars(i);
                    }}
                    key={i}
                    href="/"
                  >
                    <Star size={30} percent={percent} />
                  </a>
                ))
              }
              </div>
              { ratingIndex > -1 && (
                <div className="text-base pb-1 px-4 border-b-2 border-teal-300">
                  { this.ratings[ratingIndex] }
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-wrap px-4">
            <div className="w-full items-center flex">
              <label className="block text-sm uppercase font-bold mb-1">
                Do you recommend this product?
              </label>
            </div>
            <div className="w-full items-center flex">
              <ToggleButton watched={this.toggleRecommendation} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-full md:w-1/2 px-4">
            <label className="block text-sm uppercase font-bold mb-2">
              Nickname
            </label>
            <input onChange={this.handleInputChange} name="name" value={name} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Nickname" />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <label className="block text-sm uppercase font-bold mb-2">
              Email
            </label>
            <input onChange={this.handleInputChange} name="email" value={email} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" placeholder="joe@example.com" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-full px-4">
            <label className="block text-sm uppercase font-bold mb-2">
              Summary
            </label>
            <input onChange={this.handleInputChange} name="summary" value={summary} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Example: Best purchase ever!" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-full px-4">
            <label className="block text-sm uppercase font-bold mb-2">
              Why did you like the product or not?
            </label>
            <textarea onChange={this.handleInputChange} name="body" value={body} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" rows="4" placeholder="Review details.." />
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mb-8">
          { charOptions.map((characteristic) => (
            <RangeSlider change={this.setCharacteristic} characteristic={characteristic} key={characteristic[1]} />
          ))}
        </div>
        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-full flex flex-col px-4">
            { photos.length > 0
              ? photos.map((photo, i) => (
                <div className="w-full flex mb-3" key={i}>
                  <input onBlur={(e) => { this.updatePhoto(e, i); }} name="photo" defaultValue={photo} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="https://source.unsplash.com/random/800x600" />
                  <a
                    href="/"
                    className="flex justify-center items-center w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-xl ml-2"
                    onClick={(e) => { e.preventDefault(); this.addRow(); }}
                  >
+
                  </a>
                </div>
              ))
              : (
                <div className="w-full flex items-center text-xl">
                  <a
                    href="/"
                    className="flex justify-center items-center w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-xl"
                    onClick={(e) => { e.preventDefault(); this.addRow(); }}
                  >
  +
                  </a>
                  <span className="ml-2">Add Photo(s)</span>
                </div>
              )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mt-12">
          <div className="w-full px-4">
            <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps)(ReviewForm);
