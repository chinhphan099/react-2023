import { useMemo, useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'
import connect, { ExtraInfoType } from '../../HOC/connect'
import Title from './Title'

interface TaskInputProps extends ExtraInfoType {
  addTask: (name: string) => void
  currentTask: Todo | null
  updatingTask: (name: string) => void
  completeUpdateTask: () => void
}
function TaskInput(props: TaskInputProps) {
  const { addTask, currentTask, updatingTask, completeUpdateTask } = props
  const [name, setName] = useState<string>('')
  const title = useMemo(() => {
    if (currentTask) {
      return { name: 'Editing - ' }
    }
    return {
      name: ''
    }
  }, [currentTask])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTask && currentTask.name !== '') {
      completeUpdateTask()
    }
    if (name !== '') {
      addTask(name)
      setName('')
    }
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
      <Title title={title} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' value={currentTask ? currentTask.name : name} onChange={handleOnChangeInput} />
        <button type='submit'>{currentTask ? '✔️' : '﹢'}</button>
      </form>
    </div>
  )
}

export default connect(TaskInput)
