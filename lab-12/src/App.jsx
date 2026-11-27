import { useState } from 'react'
import HistoryButtons from './components/HistoryButtons.jsx'
import OrderBoard from './components/OrderBoard.jsx'
import OrderComposer from './components/OrderComposer.jsx'
import OrderDetails from './components/OrderDetails.jsx'
import QueueProvider from './model/QueueProvider.jsx'

export default function App() {
  // id замовлення, відкритого в «Деталях», або null. У історію не входить:
  // «Скасувати дію» не закриває й не відкриває «Деталі».
  const [openedId, setOpenedId] = useState(null)

  return (
    <QueueProvider>
      <div className="app">
        <header className="app-header">
          <h1>Черга замовлень</h1>
          <p className="lead">
            Нове замовлення приймають у формі, а далі воно йде колонками зліва
            направо.
          </p>
        </header>
        <div className="workspace">
          <OrderComposer />
          <main className="queue">
            <HistoryButtons />
            <OrderDetails
              orderId={openedId}
              onClose={() => setOpenedId(null)}
            />
            <OrderBoard onOpen={(order) => setOpenedId(order.id)} />
          </main>
        </div>
      </div>
    </QueueProvider>
  )
}
