import React from 'react';

const Star = ({ percent }) => (
  <svg id="Star" style={{ width: '25px', height: '25px' }} viewBox="0 0 550 550" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`half_grad_${percent}`}>
        <stop offset={`${percent * 100}%`} stopColor="#2d3748" />
        <stop offset={`${percent * 100}%`} stopColor="white" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#half_grad_${percent})`}
      strokeWidth="10"
      stroke="#2d3748"
      xmlns="http://www.w3.org/2000/svg"
      d="M260.37,423.15,109.52,493.7c-5.37,2.48-32.27,13.76-32.27,13.76s10.28-26.43,12.27-32L147,314.12,30.13,197c-4.19-4.21-26.06-24.36-26.06-24.36l36.43,0H197.69l48.88-137.8c2.07-5.86,13.8-33.41,13.8-33.41s11.72,27.55,13.8,33.41l48.88,137.8H480.24c5.93,0,22.14-.2,22.14-.2S490.8,188.8,486.61,193L373.73,314.12l57.48,161.33c2,5.58,12,29.65,12,29.65Z"
    />
  </svg>
);

export default Star;
