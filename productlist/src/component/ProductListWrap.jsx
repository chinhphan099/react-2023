import React, { Component } from 'react'
import ProductListTable from './ProductListTable'
import SearchBox from './SearchBox'
import './ProductListWrap.css'

const productListMock = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    inStock: true,
    name: 'Football'
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    inStock: true,
    name: 'Baseball'
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    inStock: false,
    name: 'Basketball'
  },
  {
    category: 'Electronics',
    price: '$99.99',
    inStock: true,
    name: 'iPod Touch'
  },
  {
    category: 'Electronics',
    price: '$399.99',
    inStock: false,
    name: 'iPhone 5'
  },
  {
    category: 'Electronics',
    price: '$199.99',
    inStock: true,
    name: 'Nexus 7'
  }
]
const fetchApi = () => new Promise((resolve) => resolve(productListMock))

export class ProductListWrap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      productList: [],
      inStock: false,
      searchText: ''
    }
  }
  componentDidMount() {
    fetchApi().then(res => {
      this.setState({
        productList: res
      })
    })
  }
  handleChange = (event) => {
    const { name } = event.target
    if (name === 'searchBox') {
      this.setState({
        searchText: event.target.value
      })
    } else if (name === 'inStock') {
      this.setState({
        inStock: event.target.checked
      })
    }
  }
  render() {
    const { productList, inStock, searchText } = this.state

    return (
      <div>
        <SearchBox handleChange={this.handleChange} />
        <ProductListTable productList={productList} inStock={inStock} searchText={searchText} />
      </div>
    )
  }
}

export default ProductListWrap
