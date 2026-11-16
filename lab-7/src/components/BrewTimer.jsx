import { useEffect, useState } from 'react'
import TimerView from './TimerView.jsx'

export default function BrewTimer({ method }) {
  const [secondsLeft, setSecondsLeft] = useState(method.seconds)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    setInterval(() => {
      setSecondsLeft(secondsLeft - 1)
    }, 1000)
  }, [isRunning])

  const status =
    secondsLeft <= 0
      ? 'done'
      : isRunning
        ? 'running'
        : hasStarted
          ? 'paused'
          : 'idle'

  function handleStart() {
    setHasStarted(true)
    setIsRunning(true)
  }

  function handleReset() {
    setIsRunning(false)
    setHasStarted(false)
    setSecondsLeft(method.seconds)
  }

  return (
    <TimerView
      method={method}
      secondsLeft={secondsLeft}
      status={status}
      onStart={handleStart}
      onPause={() => setIsRunning(false)}
      onReset={handleReset}
    />
  )
}
