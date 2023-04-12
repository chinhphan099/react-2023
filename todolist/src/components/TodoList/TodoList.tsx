import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { name: 'Học bài', done: false, id: 'hoc bai' },
    { name: 'Học bài 2', done: false, id: 'hoc bai 2' }
  ])
  const [currentTask, setCurrentTask] = useState<Todo | null>(null)

  const doneTodo = todos.filter((todo) => todo.done)
  const notDoneTodo = todos.filter((todo) => !todo.done)

  const addTask = (name: string) => {
    const todo: Todo = {
      name: name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])

    // Save to localStorage
  }

  const handleDoneTask = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const startUpdateTaskTitle = (id: string) => {
    // Set current
    const findCurrentTask = todos.find((task) => id === task.id)
    if (findCurrentTask) {
      setCurrentTask(findCurrentTask)
    }
  }

  const updatingTask = (name: string) => {
    setCurrentTask((prev: Todo | null) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }

  const completeUpdateTask = () => {
    setTodos((prev) => {
      return prev.map((task) => {
        if (task.id === (currentTask as Todo).id) {
          return currentTask as Todo
        }
        return task
      })
    })
    setCurrentTask(null)
  }

  return (
    <div className={styles.todoList}>
      <TaskInput
        addTask={addTask}
        currentTask={currentTask}
        updatingTask={updatingTask}
        completeUpdateTask={completeUpdateTask}
      />
      <TaskList
        todos={notDoneTodo}
        doneTaskList={false}
        handleDoneTask={handleDoneTask}
        startUpdateTaskTitle={startUpdateTaskTitle}
      />
      <TaskList
        todos={doneTodo}
        doneTaskList
        handleDoneTask={handleDoneTask}
        startUpdateTaskTitle={startUpdateTaskTitle}
      />
    </div>
  )
}
