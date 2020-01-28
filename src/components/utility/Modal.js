import React from 'react';

const Modal = ({ show, children, toggleModal }) => {
  /* eslint-disable react/no-danger */
  const style = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: (show ? 'flex' : 'none'),
  };
  return (
    <div className="fixed justify-center items-center inset-0" style={style}>
      <div className="p-10 bg-white relative">
        <a
          onClick={(e) => {
            e.preventDefault();
            toggleModal({ content: null, show: false });
          }}
          href="/"
          className="absolute top-0 right-0 -mt-5 -mr-5 text-white bg-gray-800 rounded-full w-8 h-8 cursor-pointer"
        >
          <small className="absolute font-bold text-2xl w-full text-center" style={{ marginTop: '-3px', marginLeft: '2px', transform: 'rotate(45deg)' }}>+</small>
        </a>
        <div dangerouslySetInnerHTML={{ __html: children }} />
      </div>
    </div>
  );
};

export default Modal;
