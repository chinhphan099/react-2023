import React, { useRef } from 'react'
import styles from './taskInput.module.scss'

type TitleProps = {
  title: {
    name: string
  }
  handleTitleClick: (value: any) => void
}

function Title(props: TitleProps) {
  console.log('title')
  const h1Ref = useRef(null)
  const onClickHeading = () => {
    console.log(h1Ref)
  }
  return (
    // <h1 className={styles.title} ref={h1Ref} onClick={() => props.handleTitleClick(100)}>
    <h1 className={styles.title} ref={h1Ref} onClick={onClickHeading}>
      {props.title.name}To do list typescript
    </h1>
  )
}
export default React.memo(Title)
