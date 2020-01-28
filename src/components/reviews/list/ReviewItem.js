import React from 'react';
import moment from 'moment';
import ReviewThumbnail from './thumbnail/ReviewThumbnail';
import Star from '../../utility/stars/Star';

const Review = ({ review, openModal }) => {
  const {
    rating, body, date, reviewer_name: reviewerName, summary, response, recommend, helpfulness, photos,
  } = review;
  const dateString = moment(date).format('MMMM Do, YYYY');
  const stars = [...Array(rating)].map((e) => 1);
  return (
    <div className="flex flex-col w-full mb-6 pb-6 border-b border-gray-300">
      <header className="flex items-center justify-between w-full text-xs mb-4">
        <div className="flex">
          { stars.map((percent, i) => <Star percent={1} size="15" key={Math.random()} />) }
        </div>
        <div className="flex items-center justify-end text-gray-700">
          <small className="bg-gray-400 rounded-full mr-2 font-black h-auto" style={{ fontSize: '8px', padding: '2px 3.5px' }}>{String.fromCharCode(10003)}</small>
          <span>{`${reviewerName},`}</span>
          <span className="ml-1">{ dateString }</span>
        </div>
      </header>
      <div className="flex flex-col w-full mb-4">
        <h3 className="font-bold text-xl w-full truncate">
          { summary }
        </h3>
        <p className="text-gray-600">{ body }</p>
        {
          photos.length > 0 && (
            <ul className="flex mt-3">
              { photos.map((image) => <ReviewThumbnail key={image.id} image={image} openModal={openModal} />) }
            </ul>
          )
        }
        {
          recommend > 0 && (
            <div className="my-3">
              <span className="text-2xl font-bold">
                {String.fromCharCode(10003)}
              </span>
              <span className="ml-2">I recommend this product.</span>
            </div>
          )
        }
        {
          response && (
            <div className="p-4 bg-gray-200 mt-4">
              <h5 className="text-sm font-bold">Response:</h5>
              <p className="text-gray-700">{ response }</p>
            </div>
          )
        }
      </div>
      <footer className="text-xs flex w-full">
        <span className="mr-2">Helpful?</span>
        <span>
          <a
            onClick={(e) => { e.preventDefault(); }}
            className="underline mr-1"
            href="/"
          >
            Yes
          </a>
          <span>
          (
            {helpfulness}
          )
          </span>
          <span className="mx-3 text-gray-500">|</span>
          <span>

            <a
              onClick={(e) => { e.preventDefault(); }}
              className="underline mr-1"
              href="/"
            >
              Report
            </a>
          </span>
        </span>
      </footer>
    </div>
  );
};

export default Review;
