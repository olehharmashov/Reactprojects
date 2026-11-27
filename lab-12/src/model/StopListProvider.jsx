import { useState } from 'react'
import { StopListContext } from './stopListContext.js'

/**
 * §4.7. Провайдер стоп-листа: компонент, який зберігає стоп-лист у стані
 * й передає { stopped, toggle } через StopListContext компонентам,
 * отриманим як children. На початку стоп-лист порожній.
 */
export default function StopListProvider({ children }) {
  const [stopped, setStopped] = useState([])

  function toggle(name) {
    setStopped((current) =>
      current.includes(name)
        ? current.filter((entry) => entry !== name)
        : [...current, name],
    )
  }

  return (
    <StopListContext value={{ stopped, toggle }}>{children}</StopListContext>
  )
}
