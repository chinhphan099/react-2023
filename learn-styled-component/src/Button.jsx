import React, { Component } from 'react'
import * as styled from './ButtonStyles'
import styles from './Buttons.module.css'
export class Button extends Component {
  render() {
    return (
      <>
        <styled.PrimaryButton borderRed={true}>Normal Button</styled.PrimaryButton>
        <styled.YellowButton borderRed={true}>Yellow Button</styled.YellowButton>
        <styled.PrimaryButton borderRed={true} as="a" href="#!">Link Button</styled.PrimaryButton>
        <styled.LinkComponent href="#" className="link-button" borderRed={true}>
          <span>LinkComponent</span>
        </styled.LinkComponent>
        <styled.LinkComponent22 href="#" borderRed={true}>
          <span>LinkComponent22</span>
        </styled.LinkComponent22>
        <button className={styles.redButton}>Red Button</button>
        <button className={styles.redButton}>Normal Button</button>
      </>
    )
  }
}

export default Button
