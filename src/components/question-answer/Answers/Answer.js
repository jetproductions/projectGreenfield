/* eslint-disable camelcase */
import React from 'react';

const Answer = ({
  answerer_name, body, helpfulness, date, photos,
}) => (
  <div>
    <h2>
A:
      {' '}
      {body}
    </h2>
    <span>
      {`By ${answerer_name}, ${date} | Helpful? Yes ${helpfulness} | Report`}
    </span>
    {photos.length > 0 ? (
      <>
        <h6>Photos:</h6>
        <span>Photos Go Here</span>
      </>
    ) : null}

  </div>
);

export default Answer;
