import { createContext, use } from 'react'
import {
  createDispatchHook,
  createSelectorHook,
  shallowEqual,
} from 'react-redux'

/**
 * Контекст Redux store черги замовлень і хуки, які його читають.
 *
 * Компоненти підписуються на потрібну частину store через селектор.
 */
export const QueueReduxContext = createContext(null)
const useQueueSelector = createSelectorHook(QueueReduxContext)
const useReduxDispatch = createDispatchHook(QueueReduxContext)

function useQueueContext() {
  const context = use(QueueReduxContext)
  if (context === null) {
    throw new Error('Queue hooks must be used within a QueueProvider')
  }
}

/** { queue, canUndo, canRedo } з найближчого QueueProvider. */
export function useQueue() {
  useQueueContext()
  return useQueueSelector(
    ({ present, past, future }) => ({
      queue: present,
      canUndo: past.length > 0,
      canRedo: future.length > 0,
    }),
    shallowEqual,
  )
}

/** dispatch ред'юсера черги з найближчого QueueProvider. */
export function useQueueDispatch() {
  useQueueContext()
  return useReduxDispatch()
}
