import React, { Component } from 'react';

/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */

class RelatedProductSlide extends Component {
  constructor(props) {
    const { id } = props;
    super(props);
    this.state = {
      productId: id,
      photoUrl: '',
      rating: '',
      name: '',
      category: '',
      price: 0,
    };
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    const { productId } = this.state;
    this.getInfo(productId);
  }

  getInfo = (productId) => {
    // const item = {
    //   productId: '',
    //   photoUrl: '',
    //   rating: '',
    //   name: '',
    //   category: '',
    //   price: 0,
    // };

    fetch(`http://52.26.193.201:3000/products/${productId}/styles`)
      .then((results) => results.json())
      .catch((err) => {
        throw err;
      })
      .then((res) => {
        this.setState({
          photoUrl: res.results[0].photos
            ? res.results[0].photos[0].url
            : '',
        });
      });

    fetch(`http://52.26.193.201:3000/reviews/${productId}/meta`)
      .then((results) => results.json())
      .catch((err) => {
        throw err;
      })
      .then((res) => {
        const ratingArray = Object.entries(res.ratings);
        const reviewsReduced = ratingArray.reduce(
          (acc, x) => {
            acc.qty += x[1];
            acc.score += x[1] * x[0];
            return acc;
          },
          { qty: 0, score: 0 },
        );
        this.setState({
          rating: reviewsReduced.qty === 0
            ? 0
            : reviewsReduced.score / reviewsReduced.qty,
        });
      });
    fetch(`http://52.26.193.201:3000/products/${productId}`)
      .then((results) => results.json())
      .catch((err) => {
        throw err;
      })
      .then((res) => {
        this.setState({
          name: res.name,
          category: res.category,
          price: res.default_price,
        });
      });
  };

  render() {
    const { id } = this.props;

    const {
      photoUrl,
      rating,
      name,
      category,
      price,
      productId,
    } = this.state;

    return (
      <div
        key={id}
        className="w-1/4 mx-2 border border-solid "

      >
        <a href={productId} id={productId} onClick={() => { window.location = `${window.location.host}/products/${productId}`; }}>
          <img className="w-48 h-48 object-cover cursor-pointer" src={photoUrl} />


        </a>
        <div className="">
          <div>
            {category}
          </div>
          <div>
            {name}
          </div>
          <div>
                $
            {price}
          </div>


        </div>
      </div>
    );
  }
}

export default RelatedProductSlide;
