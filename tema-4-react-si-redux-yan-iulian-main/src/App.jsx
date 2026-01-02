import React from 'react'
import TaskList from './components/TaskList'
import SelectedTasksList from './components/SelectedTasksList'
import AddTaskForm from './components/AddTaskForm'

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Task manager cu Redux</h1>

      <section style={{ marginBottom: '1rem' }}>
        <h2>Adaugă un task</h2>
        <AddTaskForm />
      </section>

      <section style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h2>Toate task-urile</h2>
          <TaskList />
        </div>

        <div>
          <h2>Task-uri selectate</h2>
          <SelectedTasksList />
        </div>
      </section>
    </div>
  )
}

export default App
