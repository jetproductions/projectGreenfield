import React from 'react';

const Photos = ({ photos }) => (photos.map((photo, i) => <img src={photo} alt={`${i} from answer`} />));
// need to add photo display on click to bring into 'modal' style
// need to make them thumbnail size
export default Photos;
