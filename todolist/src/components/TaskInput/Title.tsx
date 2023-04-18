import React from 'react'
import styles from './taskInput.module.scss'

function Title() {
  return <h1 className={styles.title}>To do list typescript</h1>
}
export default React.memo(Title)
