import { use } from 'react'
import { selectColumn } from '../model/queueReducer.js'
import { QueueContext } from '../model/queueContext.js'
import OrderColumn from './OrderColumn.jsx'
import OrderCard from './OrderCard.jsx'

const columns = [
  { status: 'new', title: 'Нові' },
  { status: 'brewing', title: 'Готуються' },
  { status: 'ready', title: 'Готові' },
  { status: 'served', title: 'Видані' },
]

export default function OrderBoard({ onOpen }) {
  const { queue } = use(QueueContext)

  return (
    <div className="board">
      {columns.map(({ status, title }) => {
        const orders = selectColumn(queue, status)
        return (
          <OrderColumn key={status} title={title} count={orders.length}>
            {orders.map((order) => (
              <li key={order.id}>
                <OrderCard order={order} onOpen={onOpen} />
              </li>
            ))}
          </OrderColumn>
        )
      })}
    </div>
  )
}
