import React from 'react';

const ReviewThumbnail = ({ image: { url, id }, openModal }) => {
  const content = `<img src="${url}" width="100% alt="${id}" />`;
  return (
    <li
      className="mr-4 w-32 h-24 bg-gray-100 shadow overflow-hidden relative"
    >
      <a
        href="/"
        onKeyPress={(e) => {
          if (e.key !== 'Enter') return;
          openModal({ show: true, content });
        }}
        onClick={(e) => {
          e.preventDefault();
          openModal({ show: true, content });
        }}
        className="absolute inset-0 cursor-pointer"
      >
        <img className="w-full cursor-pointer" src={url} alt={id} />
      </a>
    </li>
  );
};

export default ReviewThumbnail;
