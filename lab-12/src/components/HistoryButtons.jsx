import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { useQueue, useQueueDispatch } from '../model/queueContext.js'

/**
 * «Скасувати дію» й «Повторити дію» для черги. Кожна кнопка вимкнена, коли
 * нема чого скасовувати чи повторювати.
 */
export default function HistoryButtons() {
  const { canUndo, canRedo } = useQueue()
  const dispatch = useQueueDispatch()
  const undoRef = useRef(null)
  const redoRef = useRef(null)
  const onUndo = () => dispatch({ type: 'undo' })
  const onRedo = () => dispatch({ type: 'redo' })

  // Кнопка, яку вимкнуло її ж натискання (кроків більше нема), втрачає фокус,
  // і він падає на початок сторінки. Тому flushSync одразу оновлює сторінку,
  // а фокус переходить на другу кнопку.
  function press(action, button, other) {
    flushSync(action)
    if (button.current.disabled) other.current.focus()
  }

  return (
    <div className="history" role="group" aria-label="Історія змін">
      <button
        ref={undoRef}
        type="button"
        onClick={() => press(onUndo, undoRef, redoRef)}
        disabled={!canUndo}
      >
        Скасувати дію
      </button>
      <button
        ref={redoRef}
        type="button"
        onClick={() => press(onRedo, redoRef, undoRef)}
        disabled={!canRedo}
      >
        Повторити дію
      </button>
    </div>
  )
}
