import React from 'react';
import Chart from '../characteristicChart';

const characteristicSlider = ({ characteristic: [key, value] }) => {
  const chartChar = Chart.find((char) => char.name === key);
  const scale = Object.keys(chartChar.values).map((k) => ([k, chartChar.values[k]]));
  const left = (value / 5) * 100;
  const style = {
    left: `${left}%`,
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '12px solid #2d3748',
  };
  return (
    <div className="flex flex-col w-full my-5">
      <div className="w-full text-lg mb-1">{ key }</div>
      <div className="w-full flex relative items-center mb-1">
        { scale.map(([num, label], i) => (
          <div className={`${i === 1 ? 'mx-1 ' : ''}w-1/3 bg-gray-200 h-2`} key={label} />
        ))}
        <div className="w-3 h-3 absolute" style={style} />
      </div>
      <div className="w-full flex">
        { scale.map(([num, label], i) => (
          <div className={`${i === 1 ? 'text-center ' : (i === 2 ? 'text-right ' : '')}w-1/3 text-xs`} key={label}>{ label }</div>
        ))}
      </div>
    </div>
  );
};

export default characteristicSlider;
