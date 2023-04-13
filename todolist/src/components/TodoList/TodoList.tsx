import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTask, setCurrentTask] = useState<Todo | null>(null)

  const doneTodo = todos.filter((todo) => todo.done)
  const notDoneTodo = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const taskListDb = localStorage.getItem('tasklist')
    const taskListDbArray = JSON.parse(taskListDb || '[]')
    setTodos(taskListDbArray)
  }, [])

  const addTask = (name: string) => {
    const todo: Todo = {
      name: name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])

    // Save to localStorage
    const taskListDb = localStorage.getItem('tasklist')
    const taskListDbArray = JSON.parse(taskListDb || '[]')
    const newTaskListDbArray = [...taskListDbArray, todo]
    localStorage.setItem('tasklist', JSON.stringify(newTaskListDbArray))
  }

  const handleDoneTask = (id: string, done: boolean) => {
    setTodos((prev) => {
      const newToDoList = prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, done }
        }
        return todo
      })
      localStorage.setItem('tasklist', JSON.stringify(newToDoList))
      return newToDoList
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
      const newToDoList = prev.map((task) => {
        if (task.id === (currentTask as Todo).id) {
          return currentTask as Todo
        }
        return task
      })
      localStorage.setItem('tasklist', JSON.stringify(newToDoList))
      return newToDoList
    })
    setCurrentTask(null)
  }

  const deleteTask = (id: string) => {
    const newToDoList = todos.filter((task) => task.id !== id)
    setTodos(newToDoList)
    localStorage.setItem('tasklist', JSON.stringify(newToDoList))
    if (currentTask) {
      setCurrentTask(null)
    }
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
        deleteTask={deleteTask}
      />
      <TaskList
        todos={doneTodo}
        doneTaskList
        handleDoneTask={handleDoneTask}
        startUpdateTaskTitle={startUpdateTaskTitle}
        deleteTask={deleteTask}
      />
    </div>
  )
}
