import React, { useState, useEffect } from 'react';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
const ToggleButton = ({ watched }) => {
  const [toggled, setToggled] = useState(true);
  useEffect(() => {
    watched(toggled);
  }, [toggled]);
  const styles = {
    ...(toggled && {
      transform: 'translateX(100%)',
      backgroundColor: '#48bb78',
    }),
  };
  return (
    <div className="flex items-center justify-start w-full">
      <label
        htmlFor="toogleA"
        className="flex items-center cursor-pointer"
      >
        <div className="relative" onClick={() => { setToggled(!toggled); }}>
          <input type="checkbox" className="hidden" />
          <div
            className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
          />
          <div
            style={styles}
            className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 -mt-1 left-0"
          />
        </div>
        <div
          className="ml-5 text-gray-700 font-medium"
        >
          { toggled ? 'Yes, I recommend' : 'No, I do not recommend' }
        </div>
      </label>

    </div>
  );
};

export default ToggleButton;
