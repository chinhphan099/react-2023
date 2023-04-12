import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputProps {
  addTask: (name: string) => void
  currentTask: Todo | null
  updatingTask: (name: string) => void
  completeUpdateTask: () => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTask, currentTask, updatingTask, completeUpdateTask } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTask) {
      completeUpdateTask()
    } else {
      addTask(name)
    }
    setName('')
  }
  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTask) {
      updatingTask(event.target.value)
    } else {
      setName(event.target.value)
    }
  }
  return (
    <div>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' value={currentTask ? currentTask.name : name} onChange={handleOnChangeInput} />
        <button type='submit'>{currentTask ? '✔️' : '﹢'}</button>
      </form>
    </div>
  )
}
