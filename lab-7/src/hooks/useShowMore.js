import { useState } from 'react'

/**
 * Логіка «Показати ще» без розмітки.
 *
 * Використання:
 *   const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(items, 4)
 *
 * Вимоги — у тестах tests/useShowMore.test.jsx.
 */
export function useShowMore(items, step = 4) {
  const [visibleCount, setVisibleCount] = useState(step)
  const visibleItems = items.slice(0, visibleCount)
  const hiddenCount = items.length - visibleItems.length

  function showMore() {
    setVisibleCount((count) => Math.min(count + step, items.length))
  }

  function collapse() {
    setVisibleCount(step)
  }

  return { visibleItems, hiddenCount, showMore, collapse }
}
