import React, { useState } from 'react'
// Req 19, 20: Importă hook-urile Redux și acțiunea addTask
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../stores/actions/tasks'

function AddTaskForm() {
  // Req 19: Definește starea locală pentru titlu
  const [title, setTitle] = useState('')

  // Req 19: Citește lista de task-uri din store pentru calcularea id-ului nou
  const tasks = useSelector(state => state.tasks.list)

  // Obține dispatch
  const dispatch = useDispatch()

  // Req 19: Implementează logica de submit pentru formular
  const handleSubmit = (e) => {
    // Previne comportamentul default al formularului
    e.preventDefault()

    // Ignoră dacă titlul este gol (doar whitespace)
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      return
    }

    // Calculează un id nou (maxId + 1)
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0)

    // Construiește obiectul newTask
    const newTask = {
      id: maxId + 1,
      title: trimmedTitle
    }

    // Dispecerează addTask(newTask)
    dispatch(addTask(newTask))

    // Golește input-ul după adăugare
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Req 19: Leagă input-ul de starea locală title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titlul task-ului"
      />

      <button type='submit'>
        Add task
      </button>
    </form>
  )
}

export default AddTaskForm
