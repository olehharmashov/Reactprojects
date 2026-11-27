import { createContext } from 'react'

/**
 * Контексти черги замовлень і хуки, які їх читають.
 *
 * QueueContext значення — { queue, canUndo, canRedo }: стан черги
 * (present з історії) і чи є що скасувати й повторити.
 * QueueDispatchContext значення — dispatch ред'юсера черги.
 *
 * §4.5. Хуки для компонентів. Кожен читає свій контекст, а якщо компонент
 * рендериться не всередині <QueueProvider>, кидає помилку, у тексті якої
 * названо QueueProvider.
 */
export const QueueContext = createContext(null)
export const QueueDispatchContext = createContext(null)

/** { queue, canUndo, canRedo } з найближчого QueueProvider. */
export function useQueue() {
  throw new Error('Not implemented: useQueue')
}

/** dispatch ред'юсера черги з найближчого QueueProvider. */
export function useQueueDispatch() {
  throw new Error('Not implemented: useQueueDispatch')
}
