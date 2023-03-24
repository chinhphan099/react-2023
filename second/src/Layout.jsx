import React from "react";

// export default function Layout({ children }) {
//   return (<div className="layout">{ children }</div>)
// }

export default class Layout extends React.Component {
  render() {
    return (<div className="layout">{ this.props.children }</div>)
  }
}
