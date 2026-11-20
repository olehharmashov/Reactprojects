import { createContext, use, useId, useState } from 'react'

const TabsContext = createContext(null)

function useTabs() {
  const context = use(TabsContext)
  if (context === null) {
    throw new Error('Tabs.Tab і Tabs.Panel потрібно використовувати всередині <Tabs>.')
  }
  return context
}

function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue)
  const id = useId()

  return (
    <TabsContext value={{ value, setValue, id }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function List({ children, ...props }) {
  return (
    <div className="tab-list" role="tablist" {...props}>
      {children}
    </div>
  )
}

function Tab({ value, children, className = '', ...props }) {
  const tabs = useTabs()
  const selected = tabs.value === value
  const tabId = `${tabs.id}-tab-${encodeURIComponent(value)}`
  const panelId = `${tabs.id}-panel-${encodeURIComponent(value)}`

  function handleKeyDown(event) {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return

    event.preventDefault()
    const tabElements = Array.from(
      event.currentTarget.closest('[role="tablist"]').querySelectorAll('[role="tab"]'),
    )
    const currentIndex = tabElements.indexOf(event.currentTarget)
    let nextIndex

    if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = tabElements.length - 1
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % tabElements.length
    } else {
      nextIndex = (currentIndex - 1 + tabElements.length) % tabElements.length
    }

    const nextTab = tabElements[nextIndex]
    nextTab.focus()
    nextTab.click()
  }

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      className={`${className}${selected ? `${className ? ' ' : ''}active` : ''}`}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      onClick={() => tabs.setValue(value)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  )
}

function Panel({ value, children, ...props }) {
  const tabs = useTabs()
  const encodedValue = encodeURIComponent(value)

  return (
    <div
      role="tabpanel"
      id={`${tabs.id}-panel-${encodedValue}`}
      aria-labelledby={`${tabs.id}-tab-${encodedValue}`}
      tabIndex={0}
      hidden={tabs.value !== value}
      {...props}
    >
      {children}
    </div>
  )
}

Tabs.List = List
Tabs.Tab = Tab
Tabs.Panel = Panel

export default Tabs
