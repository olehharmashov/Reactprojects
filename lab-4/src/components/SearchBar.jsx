export default function SearchBar({
  filterText,
  setFilterText,
  inStockOnly,
  setInStockOnly,
}) {
  return (
    <search className="search-bar">
      <input
        type="search"
        placeholder="Пошук у меню"
        aria-label="Пошук у меню"
        value={filterText}
        onChange={(event) => setFilterText(event.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => setInStockOnly(event.target.checked)}
        />{' '}
        Лише в наявності
      </label>
    </search>
  )
}
