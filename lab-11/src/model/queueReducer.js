/**
 * Ред'юсер черги замовлень. Його написав колега; у нього черга працює.
 *
 * Стан містить orders і customers у нормалізованій формі: об'єкти
 * зберігаються в byId, а порядок їхніх id — в ids.
 * status — колонка на дошці: 'new' («Нові»), 'brewing' («Готуються»),
 * 'ready' («Готові») або 'served' («Видані»).
 *
 * Дії — події на сторінці:
 *   { type: 'order_placed', order: { id, customer: { id, name }, items } }
 *       бариста надіслав нове замовлення з форми. Номер і статус 'new'
 *       дає ред'юсер, кожен напій отримує done: false. id замовлення й
 *       гостя створює обробник події.
 *   { type: 'item_toggled', orderId, itemId }
 *       бариста відмітив напій готовим або зняв позначку
 *   { type: 'order_advanced', orderId }
 *       бариста натиснув «Почати», «Готово» чи «Видати»: замовлення
 *       переходить у наступну колонку
 *   { type: 'order_cancelled', orderId }
 *       бариста натиснув «Скасувати замовлення»
 *   { type: 'customer_renamed', customerId, name }
 *       бариста виправив ім'я гостя в «Деталях»
 *
 * Компоненти й тести читають стан лише через selectColumn і selectOrder
 * унизу файлу.
 */

const nextStatus = { new: 'brewing', brewing: 'ready', ready: 'served' }

/** Початковий стан черги з вкладених замовлень, як їх повертає loadOrders(). */
export function createInitialState(orders) {
  const lastNumber = Math.max(0, ...orders.map((order) => order.number))
  const normalizedOrders = { byId: {}, ids: [] }
  const customers = { byId: {}, ids: [] }

  for (const { customer, ...order } of orders) {
    normalizedOrders.byId[order.id] = {
      ...order,
      customerId: customer.id,
    }
    normalizedOrders.ids.push(order.id)

    if (!customers.byId[customer.id]) {
      customers.byId[customer.id] = { ...customer }
      customers.ids.push(customer.id)
    }
  }

  return { orders: normalizedOrders, customers, lastNumber }
}

export function queueReducer(state, action) {
  switch (action.type) {
    case 'order_placed': {
      const lastNumber = state.lastNumber + 1
      const order = {
        id: action.order.id,
        number: lastNumber,
        status: 'new',
        customerId: action.order.customer.id,
        items: action.order.items.map((item) => ({ ...item, done: false })),
      }
      const customer = action.order.customer
      const isNewCustomer = !state.customers.byId[customer.id]
      return {
        ...state,
        lastNumber,
        orders: {
          byId: { ...state.orders.byId, [order.id]: order },
          ids: [...state.orders.ids, order.id],
        },
        customers: isNewCustomer
          ? {
              byId: {
                ...state.customers.byId,
                [customer.id]: { ...customer },
              },
              ids: [...state.customers.ids, customer.id],
            }
          : state.customers,
      }
    }
    case 'item_toggled': {
      const order = state.orders.byId[action.orderId]
      if (!order) return state
      return {
        ...state,
        orders: {
          ...state.orders,
          byId: {
            ...state.orders.byId,
            [order.id]: {
              ...order,
              items: order.items.map((item) =>
                item.id === action.itemId ? { ...item, done: !item.done } : item,
              ),
            },
          },
        },
      }
    }
    case 'order_advanced': {
      const order = state.orders.byId[action.orderId]
      if (!order) return state
      return {
        ...state,
        orders: {
          ...state.orders,
          byId: {
            ...state.orders.byId,
            [order.id]: { ...order, status: nextStatus[order.status] },
          },
        },
      }
    }
    case 'order_cancelled': {
      if (!state.orders.byId[action.orderId]) return state
      const byId = { ...state.orders.byId }
      delete byId[action.orderId]
      return {
        ...state,
        orders: {
          byId,
          ids: state.orders.ids.filter((id) => id !== action.orderId),
        },
      }
    }
    case 'customer_renamed': {
      const customer = state.customers.byId[action.customerId]
      if (!customer) return state
      return {
        ...state,
        customers: {
          ...state.customers,
          byId: {
            ...state.customers.byId,
            [customer.id]: { ...customer, name: action.name },
          },
        },
      }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

/**
 * Замовлення однієї колонки (status) у порядку надходження, кожне разом із
 * гостем і напоями.
 */
export function selectColumn(state, status) {
  return state.orders.ids
    .map((id) => selectOrder(state, id))
    .filter((order) => order.status === status)
}

/** Замовлення за id разом із гостем і напоями; undefined, якщо його немає. */
export function selectOrder(state, id) {
  const order = state.orders.byId[id]
  if (!order) return undefined
  return {
    ...order,
    customer: state.customers.byId[order.customerId],
  }
}
