import SearchBar from './components/SearchBar.jsx'
import MenuTable from './components/MenuTable.jsx'
import CafeInfo from './components/CafeInfo.jsx'
import { menu } from './data.js'
import { useState } from 'react'


export default function App() {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>
      <SearchBar filterText={filterText} setFilterText={setFilterText} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} />
      <MenuTable menu={menu} filterText={filterText} inStockOnly={inStockOnly} />
      <CafeInfo />
    </main>
  )
}
