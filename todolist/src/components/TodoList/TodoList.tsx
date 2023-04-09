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

  const doneTodo = todos.filter((todo) => todo.done)
  const notDoneTodo = todos.filter((todo) => !todo.done)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name: name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])

    // Save to localStorage
  }

  const updateTodoList = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  return (
    <div className={styles.todoList}>
      <TaskInput addTodo={addTodo} />
      <TaskList todos={notDoneTodo} doneTaskList={false} updateTodoList={updateTodoList} />
      <TaskList todos={doneTodo} doneTaskList updateTodoList={updateTodoList} />
    </div>
  )
}
