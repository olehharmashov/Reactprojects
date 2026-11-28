/**
 * Провайдер Redux store черги для всіх дочірніх компонентів.
 */
import { useState } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { loadOrders } from '../data/orders.js'
import { createInitialState, queueReducer } from './queueReducer.js'
import { QueueReduxContext } from './queueContext.js'
import { createHistory, withUndo } from './withUndo.js'

const undoableQueue = withUndo(queueReducer)

function createQueueStore() {
  const initialHistory = createHistory(createInitialState(loadOrders()))

  return configureStore({
    reducer: (history = initialHistory, action) =>
      action.type.startsWith('@@redux/')
        ? history
        : undoableQueue(history, action),
  })
}

export default function QueueProvider({ children }) {
  const [store] = useState(createQueueStore)

  return (
    <Provider context={QueueReduxContext} store={store}>
      {children}
    </Provider>
  )
}
