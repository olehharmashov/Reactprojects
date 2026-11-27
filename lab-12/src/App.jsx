import OrderComposer from './components/OrderComposer.jsx'
import QueuePanel from './components/QueuePanel.jsx'
import QueueProvider from './model/QueueProvider.jsx'

export default function App() {
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
          <QueuePanel />
        </div>
      </div>
    </QueueProvider>
  )
}
