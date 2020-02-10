import React, { Component } from 'react';

const Features = (props) => {
  const { features } = props;

  const featureHtml = features ? features.map((feature) => (
    <li key={feature.feature}>
      ✓
      {'   '}
      {feature.feature}
:
      {' '}
      {feature.value}
    </li>
  )) : (<div />);

  return (
    <ul className="featureList mx-8 my-12 ">
      {featureHtml}
    </ul>
  );
};

export default Features;
