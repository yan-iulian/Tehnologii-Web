import React from 'react'
// Req 12, 14, 15, 16: Importă hook-urile Redux și acțiunile pentru selecție
import { useSelector, useDispatch } from 'react-redux'
import { selectTask, deselectTask } from '../stores/actions/selection'

function TaskList() {
  // Req 12: Citește task-urile din store
  const tasks = useSelector(state => state.tasks.list)
  // Req 14: Citește selecțiile din store
  const selectedIds = useSelector(state => state.selection.selectedIds)

  // Obține dispatch din Redux
  const dispatch = useDispatch()

  // Req 15: Handler pentru selectare
  const handleSelect = (id) => {
    dispatch(selectTask(id))
  }

  // Req 16: Handler pentru deselectare
  const handleDeselect = (id) => {
    dispatch(deselectTask(id))
  }

  return (
    <ul>
      {tasks.map(task => {
        const isSelected = selectedIds.includes(task.id)

        return (
          <li key={task.id}>
            <span>{task.title}</span>
            {' '}
            {/* Req 14, 15, 16: Afișează butonul corect în funcție de starea de selecție */}
            {isSelected ? (
              <button onClick={() => handleDeselect(task.id)}>deselect</button>
            ) : (
              <button onClick={() => handleSelect(task.id)}>select</button>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default TaskList
