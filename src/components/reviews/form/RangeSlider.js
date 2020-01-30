import React, { useState } from 'react';
import Chart from '../characteristicChart';
import './rangeslider.css';

/* eslint-disable jsx-a11y/label-has-associated-control */
const RangeSlider = ({ characteristic: [name, id], change }) => {
  const chartChar = Chart.find(({ name: charName }) => charName.toLowerCase() === name.toLowerCase());
  const { values = [] } = chartChar;
  const valuesArr = Object.keys(values).map((key) => ([key, values[key]]));

  const [value, setCharacteristic] = useState('1');

  return (
    <div className="w-full px-4 mb-4">
      <label className="block uppercase font-bold mb-0">
        {name}
      </label>
      <input
        onChange={(e) => {
          const { target: { value: v } } = e;
          setCharacteristic(v);
          change({ [id]: v });
        }}
        type="range"
        className="mb-0"
        value={value}
        name={id}
        min="1"
        max="5"
      />
      <div className="flex">
        { valuesArr.map(([k, val], i) => {
          const classes = i > 0
            ? i > 1
              ? 'text-right'
              : 'text-center'
            : 'text-left';
          return (
            <div className={`${classes} w-1/3 text-xs`} key={k}>
              { val }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RangeSlider;
