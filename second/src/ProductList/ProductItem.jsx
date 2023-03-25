import React, { Component } from 'react'

export class ProductItem extends Component {
  render() {
    const { product } = this.props
    return (
      <div className="product-item">
        <input id={product.id} value={product.name} onChange={() => {}} />
      </div>
    )
  }
}

export default ProductItem
