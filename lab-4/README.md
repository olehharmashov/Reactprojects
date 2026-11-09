# ЛР-4. Стан і ефекти

Стартовий проєкт лабораторної роботи № 4 курсу «Розробка вебзастосунків на
React»: сторінка «Меню кав'ярні». Інструкція:
https://denysmatsevych.github.io/web-development-2026/react/labs/lab-4/

Сторінка показує меню кав'ярні з пошуком, фільтром наявності та збереженням
вибраних фільтрів між перезавантаженнями.

## Команди

`npm install` виконуйте в корені репозиторію `react-labs`, решту — у теці
`lab-4/`:

- `npm run dev`: dev-сервер на http://localhost:5173
- `npm run lint`: ESLint
- `npm run format:check`: перевірка форматування Prettier
- `npm run build`: production-збірка в `dist/`

## Потік даних

Суцільні стрілки показують пропси, які батьківський компонент передає
дочірньому; пунктирні — оновлення стану через обробники або запис у сховище
поза React.

```mermaid
flowchart TD
  App --> FilterableMenuTable
  FilterableMenuTable -->|"filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange, onReset"| SearchBar
  SearchBar -.->|"onFilterTextChange, onInStockOnlyChange, onReset"| FilterableMenuTable
  FilterableMenuTable -->|"menu, filterText, inStockOnly"| MenuTable
  App --> CafeInfo
  MenuTable -->|"category"| MenuCategory["MenuCategory × 3"]
  MenuCategory -->|"item"| MenuItemRow["MenuItemRow × 4, 3, 3"]
  FilterableMenuTable -.->|"menu.filterText, menu.inStockOnly"| localStorage["localStorage"]
```

## Колокація стану

При зміні пошукового тексту React DevTools підсвічує повторні рендери. Кількість
видимих категорій і позицій після фільтрації залежить від запиту.

| Етап | Компоненти, що оновлюються |
|---|---|
| До колокації | `App`, `SearchBar`, `MenuTable`, `MenuCategory` (усі видимі), `MenuItemRow` (усі видимі), `CafeInfo` |
| Після колокації | `FilterableMenuTable`, `SearchBar`, `MenuTable`, `MenuCategory` (усі видимі), `MenuItemRow` (усі видимі) |
