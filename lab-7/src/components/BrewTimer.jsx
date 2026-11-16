import { useState } from 'react'
import { useCountdown } from '../hooks/useCountdown.js'
import TimerView from './TimerView.jsx'

export default function BrewTimer({ method }) {
  const { secondsLeft, isRunning, start, pause, reset } = useCountdown(
    method.seconds,
  )
  const [hasStarted, setHasStarted] = useState(false)

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
    start()
  }

  function handleReset() {
    setHasStarted(false)
    reset()
  }

  return (
    <TimerView
      method={method}
      secondsLeft={secondsLeft}
      status={status}
      onStart={handleStart}
      onPause={pause}
      onReset={handleReset}
    />
  )
}
