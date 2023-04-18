import React from 'react'
import styles from './taskInput.module.scss'

type TitleProps = {
  title: {
    name: string
  }
  handleTitleClick: (value: any) => void
}

function Title(props: TitleProps) {
  console.log('title')
  return (
    <h1 className={styles.title} onClick={() => props.handleTitleClick(100)}>
      {props.title.name}To do list typescript
    </h1>
  )
}
export default React.memo(Title)
