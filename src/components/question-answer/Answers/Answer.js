/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';

const Answer = ({
  answerer_name, body, helpfulness, date, photos,
}) => {
  const dateString = moment(date).format('MMMM Do, YYYY');
  return (
    <div>
      <h2>
A:
        {' '}
        {body}
      </h2>
      <span>
        {`By ${answerer_name}, ${dateString} | Helpful? Yes ${helpfulness} | Report`}
      </span>
      {photos.length > 0 ? (
        <>
          <h6>Photos:</h6>
          <span>Photos Go Here</span>
        </>
      ) : null}

    </div>
  );
};

export default Answer;
