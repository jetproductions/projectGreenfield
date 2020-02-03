import React from 'react';

const Photos = ({ photos }) => (photos.map((photo, i) => <img src={photo} alt={`${i} from answer`} />));

export default Photos;
