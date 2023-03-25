import React, { Component } from 'react'
import ProductItem from './ProductItem'

export class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      productList: [
        {
          id: '1a',
          name: 'sony'
        },
        {
          id: '2b',
          name: 'canon'
        }
      ]
    }
  }

  sortProductList = () =>  {
    this.setState((prevState => ({
      productList: prevState.productList.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    })))
  }

  addProduct = () => {
    this.setState((prevState => ({
      productList: [
        ...prevState.productList,
        {
          id: '3c',
          name: 'Xiaomi'
        }
      ]
    })))
  }

  render() {
    return (
      <div>
        <h2>ProductList</h2>
        <button onClick={this.sortProductList}>Sort Product List</button>
        <button onClick={this.addProduct}>Add Product</button>
        <div className="product-list">
          {this.state.productList.map(product => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default ProductList
