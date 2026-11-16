import { useShowMore } from '../hooks/useShowMore.js'

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
export default function ShowMore({ items, step = 4, children }) {
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    items,
    step,
  )
  const isExpanded = hiddenCount === 0

  return (
    <>
      {children(visibleItems)}
      {items.length > step && (
        <button
          type="button"
          className="show-more"
          onClick={isExpanded ? collapse : showMore}
        >
          {isExpanded
            ? 'Згорнути'
            : `Показати ще ${Math.min(step, hiddenCount)}`}
        </button>
      )}
    </>
  )
}
