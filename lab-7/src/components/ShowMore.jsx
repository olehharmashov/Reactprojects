import { useState } from 'react'

/**
 * Показує перші `step` елементів з `items` і кнопку, що показує наступні.
 *
 * Використання:
 *   <ShowMore items={reviews} step={3}>
 *     {(visibleItems) => <ul>…</ul>}
 *   </ShowMore>
 *
 * Вимоги — у тестах tests/ShowMore.test.jsx.
 */
export default function ShowMore({ items, step, children }) {
  const [visibleCount, setVisibleCount] = useState(step)
  const visibleItems = items.slice(0, visibleCount)
  const isExpanded = visibleCount >= items.length

  function handleClick() {
    setVisibleCount((count) =>
      count >= items.length ? step : Math.min(count + step, items.length),
    )
  }

  return (
    <>
      {children(visibleItems)}
      {items.length > step && (
        <button type="button" className="show-more" onClick={handleClick}>
          {isExpanded
            ? 'Згорнути'
            : `Показати ще ${Math.min(step, items.length - visibleCount)}`}
        </button>
      )}
    </>
  )
}
