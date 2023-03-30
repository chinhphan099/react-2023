import React, { Component } from 'react'

export class ProductListTable extends Component {
  render() {
    const { productList, inStock, searchText } = this.props
    const rows = []
    let lastCategory = null
    productList.forEach(productItem => {
      if ((inStock && !productItem.inStock) || productItem.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1) {
        return
      }
      if (productItem.category !== lastCategory) {
        rows.push(
          <tr key={productItem.category}>
            <td colSpan={2}>{productItem.category}</td>
          </tr>
        )
        lastCategory = productItem.category
      }
      rows.push(
        <tr key={productItem.name}>
          <td>{productItem.name}</td>
          <td>{productItem.price}</td>
        </tr>
      )
    })
    return (
      <table>
        <tbody>
        {rows}
        </tbody>
      </table>
    )
  }
}

export default ProductListTable
