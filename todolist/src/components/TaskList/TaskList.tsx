import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
  updateTodoList: (id: string, done: boolean) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, updateTodoList } = props
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
                  updateTodoList(todo.id, event.target.checked)
                }}
              />
              <span className={`${styles.taskName} ${doneTaskList ? styles.taskNameDone : ''}`}>{todo.name}</span>
              <div className={styles.taskActions}>
                <button className={styles.taskBtn}>✎</button>
                <button className={styles.taskBtn}>🗑</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
