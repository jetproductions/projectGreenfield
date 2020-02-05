import React, { Component } from 'react';
import { connect } from 'react-redux';
import reviewsMetaData from '../../../sampleData/reviews/reviewMetaData';
import reviewsListData from '../../../sampleData/reviews/reviewsList';
import ReviewsList from './list/ReviewsList';
import ReviewForm from './form/ReviewForm';
import Weighted from './weighted/Weighted';
import RatingSlider from './slider/RatingSlider';
import Characteristic from './characteristic/CharacteristicSlider';
import StarRatings from '../utility/stars/StarRatings';
import Modal from '../utility/Modal';
import './reviews.css';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
class Reviews extends Component {
  API_URL = 'http://52.26.193.201:3000';

  constructor(props) {
    super(props);
    const { product: { id } } = props;

    this.state = {
      reviewsMeta: reviewsMetaData,
      reviewsList: reviewsListData,
      cached: reviewsListData,
      sort: 'newest',
      count: 5,
      filtered: false,
      modal: {
        show: false,
        content: null,
      },
    };
    this.getReviewsMeta();
    this.getReviewsList();
  }

  componentDidUpdate(prevProps) {
    const { product: { id } } = this.props;
    if (id === prevProps.product.id) return;
    this.getReviewsMeta();
    this.getReviewsList();
  }

  getReviewsMeta = async () => {
    const { product: { id } } = this.props;
    const reviewsMeta = await fetch(`${this.API_URL}/reviews/${id}/meta`).then((res) => res.json());
    const { ratings } = reviewsMeta;
    this.setState({ reviewsMeta }, () => {
      this.setWeightedAverage(ratings);
    });
  }

  getReviewsList = async () => {
    const { product: { id } } = this.props;
    const { sort } = this.state;
    const reviewsList = await fetch(`${this.API_URL}/reviews/${id}/list?sort=${sort}&count=10000`).then((res) => res.json());
    const { results } = reviewsList;
    const { setTotalReviewsState } = this.props;
    this.setState({ reviewsList, cached: reviewsList }, () => {
      setTotalReviewsState(results.length);
    });
  }

  updateSort = (e) => {
    const { target: { value } } = e;
    this.setState({ sort: value }, () => {
      this.getReviewsList();
    });
  }

  loadMoreReviews = () => {
    const { count: previous } = this.state;
    const count = previous + 5;
    this.setState({ count });
  }

  getTotalRatings = (ratings) => Object.values(ratings).reduce((acc, value) => acc + value, 0)

  setWeightedAverage = (ratings) => {
    const totalRatings = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);
    const weightedTotal = Object.keys(ratings).reduce((acc, key) => acc + (key * ratings[key]), 0);
    const average = (weightedTotal / totalRatings);
    // round to closets quarter
    const { setWeightedState } = this.props;
    setWeightedState(Math.round(average * 4) / 4);
  }

  calcRecommended = () => {
    const { reviewsMeta: { recommended = {} } } = this.state;
    const total = Object.values(recommended).length ? Object.values(recommended).reduce((acc, curr) => acc + curr, 0) : 1;
    const recommendations = recommended['1'] || 0;
    const percentage = Math.floor((recommendations / total) * 100);
    return percentage;
  }

  filterByRating = (selected) => {
    const { reviewsList, cached: { results } } = this.state;
    const filtered = results.filter(({ rating }) => rating === Number(selected));
    this.setState({ reviewsList: { ...reviewsList, results: filtered }, filtered: true });
  }

  clearFilter = () => {
    const { reviewsList, cached: { results } } = this.state;
    this.setState({ reviewsList: { ...reviewsList, results }, filtered: false });
  }

  toggleModal = ({ show, content }) => {
    this.setState({ modal: { show, content } });
  }

  updateReview = async ({ action: { type }, payload: review }) => {
    let endpoint = '';
    switch (type) {
      case 'HELPFUL':
        endpoint += 'helpful';
        break;
      case 'REPORT':
        endpoint += 'report';
        break;
      default:
    }
    const { review_id: id } = review;
    const { ok } = await fetch(`${this.API_URL}/reviews/${endpoint}/${id}`, {
      method: 'PUT',
    });
    if (!ok || endpoint === 'report') return;
    const { reviewsList, reviewsList: { results }, cached } = this.state;
    const reviewIndex = results.findIndex((r) => r.review_id === id);
    const updated = { ...review, helpfulness: review.helpfulness + 1 };
    const reviews = [...results];
    reviews.splice(reviewIndex, 1, updated);

    this.setState({ reviewsList: { ...reviewsList, results: reviews }, cached: { ...cached, results: reviews } });
  }

  createReview = async (review) => {
    const { product: { id } } = this.props;
    const { ok } = await fetch(`${this.API_URL}/reviews/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!ok) return;

    this.toggleModal({ show: false, content: null });
    this.getReviewsList();
    this.getReviewsMeta();
  }

  render() {
    const { reviewsMeta } = this.state;
    const {
      reviewsList: { results: allReviews }, filtered, sort, count,
    } = this.state;
    const reviews = allReviews.slice(0, count);
    const { modal: { show, content } } = this.state;
    const { ratings, characteristics } = reviewsMeta;
    const { weighted } = this.props;
    const totalRatings = this.getTotalRatings(ratings);
    const recommended = this.calcRecommended();
    const ratingsArray = Object.keys(ratings).map((key) => ([key, ratings[key]])).sort((a, b) => b[0] - a[0]);
    const characteristicArray = Object.keys(characteristics)
      .map((char) => {
        const { value } = characteristics[char];
        return [char, value];
      });

    return (
      <div id="reviews" className="reviews py-12">
        <div className="container mx-auto px-4">
          <div className="flex w-full -mx-4 mb-8">
            <div className="w-full px-4">
              <h5 className="uppercase font-thin text-xl">Ratings & Reviews</h5>
            </div>
          </div>
          <div className="flex flex-wrap w-full -mx-4">
            <div className="flex flex-col w-full md:w-1/3 pl-4 pr-8">
              <div className="flex w-full mb-4">
                <Weighted />
                <StarRatings rating={weighted} size="20" />
              </div>
              <div className="mb-4 py-2">
                <span>{ `${recommended}% of people recommend this product` }</span>
              </div>
              <div className="mb-4">
                { ratingsArray.map((rating) => (
                  <RatingSlider filter={this.filterByRating} total={totalRatings} rating={rating} key={rating[0]} />))}
                { filtered && (
                  <div className="mt-4 text-right">
                    <a onClick={(e) => { e.preventDefault(); this.clearFilter(); }} href="/" className="text-xs underline">clear filter</a>
                  </div>
                )}
              </div>
              <div className="mb-4">
                { characteristicArray.map((characteristic) => (
                  <Characteristic characteristic={characteristic} key={characteristic[0]} />))}
              </div>
            </div>
            <div className="flex flex-col w-full md:w-2/3 pr-4 pl-8">
              <div className="w-full flex justify-between">
                <div className="w-full flex-grow font-bold text-2xl mb-12">
                  <span className="mr-2">{ allReviews.length }</span>
                  total reviews, sorted by
                  <div className="inline-block relative">
                    <select onChange={this.updateSort} defaultValue={sort} className="block appearance-none w-full bg-white border-0 font-bold py-2 px-2 pr-8 underline leading-tight focus:outline-none focus:bg-white">
                      <option>newest</option>
                      <option>relevant</option>
                      <option>helpful</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink py-3 text-right">
                  Showing
                  <span className="mx-1">{ count < allReviews.length ? count : 'All' }</span>
                  reviews
                </div>
              </div>
              {
                allReviews.length > 0
                  ? (
                    <ReviewsList
                      update={this.updateReview}
                      openModal={this.toggleModal}
                      reviews={reviews}
                    />
                  )
                  : (
                    <h3 className="text-xl font-bold">No reviews yet...add one below!</h3>
                  )
              }
              <div className="w-full flex justify-start mt-8">
                <button
                  onClick={(e) => {
                    this.toggleModal({ show: true, content: <ReviewForm create={this.createReview} characteristics={characteristics} /> });
                  }}
                  type="button"
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                Add Review
                </button>
                { allReviews.length > count && (
                  <button
                    onClick={this.loadMoreReviews}
                    type="button"
                    className="bg-white border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-2 px-4 ml-4 rounded"
                  >
                    More Reviews
                  </button>
                ) }
              </div>
            </div>
          </div>
        </div>
        {
          show && (
            <Modal show={show} toggleModal={this.toggleModal}>
              {content}
            </Modal>
          )
        }
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  product: state.product,
  weighted: state.weighted,
});

const mapDispatchToState = (dispatch) => ({
  setWeightedState: (total) => { dispatch({ type: 'SET_WEIGHTED_AVERAGE', payload: total }); },
  setTotalReviewsState: (total) => { dispatch({ type: 'SET_TOTAL_REVIEWS', payload: total }); },
});

export default connect(mapPropsToState, mapDispatchToState)(Reviews);
