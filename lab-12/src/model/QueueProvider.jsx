/**
 * Провайдер стану черги та dispatch ред'юсера для всіх дочірніх компонентів.
 */
import { useReducer } from 'react'
import { loadOrders } from '../data/orders.js'
import { createInitialState, queueReducer } from './queueReducer.js'
import { QueueContext, QueueDispatchContext } from './queueContext.js'
import { createHistory, withUndo } from './withUndo.js'

const undoableQueue = withUndo(queueReducer)

export default function QueueProvider({ children }) {
  const [history, dispatch] = useReducer(undoableQueue, null, () =>
    createHistory(createInitialState(loadOrders())),
  )

  return (
    <QueueContext
      value={{
        queue: history.present,
        canUndo: history.past.length > 0,
        canRedo: history.future.length > 0,
      }}
    >
      <QueueDispatchContext value={dispatch}>{children}</QueueDispatchContext>
    </QueueContext>
  )
}
