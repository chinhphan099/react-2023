import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
  handleDoneTask: (id: string, done: boolean) => void
  startUpdateTaskTitle: (id: string) => void
  deleteTask: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTask, startUpdateTaskTitle, deleteTask } = props
  let title: string = ''

  if (!doneTaskList && todos.length > 0) {
    title = 'Hoàn thành'
  } else if (doneTaskList && todos.length > 0) {
    title = 'Chưa hoàn thành'
  }
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={`${styles.tasks} ${doneTaskList ? styles.tasksDone : ''}`}>
        {todos.map((todo) => {
          return (
            <div className={styles.task} key={todo.id}>
              <input
                type='checkbox'
                className={styles.taskCheckbox}
                checked={todo.done}
                onChange={(event) => {
                  handleDoneTask(todo.id, event.target.checked)
                }}
              />
              <span className={`${styles.taskName} ${doneTaskList ? styles.taskNameDone : ''}`}>{todo.name}</span>
              <div className={styles.taskActions}>
                <button className={styles.taskBtn} onClick={() => startUpdateTaskTitle(todo.id)}>
                  ✎
                </button>
                <button className={styles.taskBtn} onClick={() => deleteTask(todo.id)}>
                  🗑
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
