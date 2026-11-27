import { useId } from 'react'

export default function OrderColumn({ title, count, children }) {
  const titleId = useId()
  return (
    <section className="column" aria-labelledby={titleId}>
      {/* tabIndex: сюди переходить фокус, коли картку з колонки скасовано */}
      <h2 id={titleId} tabIndex={-1}>
        {title} ({count})
      </h2>
      {count > 0 ? (
        <ul className="cards">{children}</ul>
      ) : (
        <p className="empty">Порожньо</p>
      )}
    </section>
  )
}
