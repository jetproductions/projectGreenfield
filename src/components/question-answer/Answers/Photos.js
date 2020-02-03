import React from 'react';

// TODO: add photo display on click to bring into 'modal' style
// TODO: make photos thumbnail size and setup display

const Photos = ({ photos }) => (photos.map((photo, i) => <img src={photo} alt={`${i} from answer`} />));

export default Photos;
