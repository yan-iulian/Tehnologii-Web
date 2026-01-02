import React from 'react'
// Req 13, 17, 18: Importă hook-urile Redux și acțiunea pentru deselect
import { useSelector, useDispatch } from 'react-redux'
import { deselectTask } from '../stores/actions/selection'

function SelectedTasksList() {
  // Req 13, 17: Citește task-urile și selecțiile din store
  const tasks = useSelector(state => state.tasks.list)
  const selectedIds = useSelector(state => state.selection.selectedIds)

  // Obține dispatch
  const dispatch = useDispatch()

  // Req 17: Construiește lista de task-uri selectate
  const selectedTasks = tasks.filter(task => selectedIds.includes(task.id))

  // Req 13: Afișează mesaj dacă lista e goală
  if (selectedTasks.length === 0) {
    return <p>Niciun task selectat</p>
  }

  return (
    <ul>
      {selectedTasks.map(task => (
        <li key={task.id}>
          <span>{task.title}</span>
          {' '}
          {/* Req 18: Buton pentru deselectarea unui task din lista de selecții */}
          <button onClick={() => dispatch(deselectTask(task.id))}>deselect</button>
        </li>
      ))}
    </ul>
  )
}

export default SelectedTasksList
