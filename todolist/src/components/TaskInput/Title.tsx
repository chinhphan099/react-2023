import React from 'react'
import styles from './taskInput.module.scss'

type TitleProps = {
  title: {
    name: string
  }
}

function Title(props: TitleProps) {
  console.log('title')
  return <h1 className={styles.title}>{props.title.name}To do list typescript</h1>
}
export default React.memo(Title)
