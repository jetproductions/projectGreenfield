import React from 'react';

// TODO: make photos thumbnail size
// TODO: add photo display on click to bring into 'modal' style

const Photos = ({ photos }) => (photos.map((photo, i) => <img src={photo} alt={`${i} from answer`} />));

export default Photos;
