import React from "react";
import PropTypes from "prop-types";
export default class BareInput extends React.Component {
  constructor(props) {
    super(props)
    this.value = 100
  }
  render() {
    const { type: typeInput, ...rest } = this.props // sửa tên cho trường hợp trùng tên
    return (<input {...rest} type={typeInput} />)
  }
}

// export default function BareInput(props) {
//   const { type: typeInput, ...rest } = props // sửa tên cho trường hợp trùng tên
//   return (<input {...rest} type={typeInput} />)
// }
BareInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool
}
