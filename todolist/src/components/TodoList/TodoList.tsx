import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

// interface HandleNewTodos {
//   (todos: Todo[]): Todo[]
// }
type HandleNewTodos = (todos: Todo[]) => Todo[]

const syncToLocalStorage = (HandleNewTodos: HandleNewTodos) => {
  const taskListDb = localStorage.getItem('tasklist')
  const taskListDbArray = JSON.parse(taskListDb || '[]')
  const newTaskListDbArray = HandleNewTodos(taskListDbArray)
  localStorage.setItem('tasklist', JSON.stringify(newTaskListDbArray))
}

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
    syncToLocalStorage((todosObj: Todo[]) => [...todosObj, todo]) // todosObj được truyền trong syncToLocalStorage
  }

  const handleDoneTask = (id: string, done: boolean) => {
    const callback = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (id === todo.id) {
          return { ...todo, done }
        }
        return todo
      })
    }
    setTodos(callback)
    syncToLocalStorage(callback)
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
    const callback = (todoArray: Todo[]) => {
      return todoArray.map((task) => {
        if (task.id === (currentTask as Todo).id) {
          return currentTask as Todo
        }
        return task
      })
    }
    setTodos(callback)
    setCurrentTask(null)
    syncToLocalStorage(callback)
  }

  const deleteTask = (id: string) => {
    if (currentTask) {
      setCurrentTask(null)
    }
    const callback = (todos: Todo[]) => todos.filter((task) => task.id !== id)
    setTodos(callback)
    syncToLocalStorage(callback)
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
