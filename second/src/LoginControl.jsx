import React from "react"
class LoginButton extends React.Component {
  render() {
    return (<button onClick={this.props.onClick}>Login</button>)
  }
}
class LogoutButton extends React.Component {
  render() {
    return (<button onClick={this.props.onClick}>Logout</button>)
  }
}
export default class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  handleLogin = () => {
    console.log('login')
    this.setState({isLoggedIn: true})
  }
  handleLogout = () => {
    console.log('logout')
    this.setState({isLoggedIn: false})
  }

  render() {
    if (this.props.isHide) {
      return null
    }
    return (<div className="login-control">
      {this.state.isLoggedIn ? <LogoutButton onClick={this.handleLogout} /> : <LoginButton onClick={this.handleLogin} />}
    </div>)
  }
}
