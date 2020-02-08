import React, { Component } from 'react';
import { connect } from 'react-redux';
import RelatedProductSlide from './RelatedProductSlide';

/* eslint-disable no-undef */


class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    const { product: { id } } = props;

    //  Takes a product ID in as 'product' in props.
    this.state = {

      relatedArray: [],
      preparedArray: [],

    };
    // this.getInfo = this.getInfo.bind(this);
    // this.generateHtml = this.generateHtml.bind(this);
    this.getRelatedProducts(id);
    // this.generateHtml();
  }

  componentDidUpdate(prevProps, prevState) {
    const { product: { id } } = this.props;
    const { preparedArray } = this.state;
    if (id === prevProps.product.id) {
      return;
    }
    this.getRelatedProducts(id);
    // if (relatedList === prevProps.relatedList) {
    //   return;
    // }
    // this.setRelatedProducts(preparedArray);


    // this.generateHtml();
  }

  // setRelatedProducts = (info) => {
  //   const { generateHtml } = this;
  //   this.setState({ preparedArray: info }, generateHtml);
  // }

  // generateHtml=() => {
  //   const { preparedArray } = this.state;
  //   const htmlResult = preparedArray.map((item) => (
  //     <div key={Math.random() * Math.random()} className="w-1/4 mx-2 border border-solid">
  //       <img className="w-48 h-48 object-cover" src={item.photoUrl} />
  //       <div className="">
  //         Category -
  //         {' '}
  //         {item.category}
  //         Name -
  //         {' '}
  //         {item.name}
  //         $
  //         {item.price}
  //       </div>
  //     </div>
  //   ));
  //   this.setState({ relatedHtml: htmlResult });
  // }

  getRelatedProducts = (id) => {
    const { relatedProductHandler } = this.props;
    fetch(`http://52.26.193.201:3000/products/${id}/related`)
      .then((results) => results.json())
      .catch((err) => { throw err; })
      .then((res) => this.setState({ relatedArray: res.slice(0, 4) }));
    // .then(() => { const { relatedArray } = this.state; const readyInfo = relatedArray.map((item) => this.getInfo(item)); return readyInfo; })
    // .then(((mappedInfo) => this.setRelatedProducts(mappedInfo)));
  }


  render() {
    const { relatedArray } = this.state;
    const html = relatedArray.map((item) => <RelatedProductSlide id={item} key={item} />);

    return (
      <div className="w-3/4 mr-auto ml-auto">
        <div className="flex">
          {html}
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  product: state.product,
  weighted: state.weighted,
});
export default connect(mapPropsToState)(RelatedProducts);
