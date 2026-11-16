import { useCallback, useEffect, useState } from 'react'

/**
 * Зворотний відлік від `totalSeconds` до нуля, по секунді.
 *
 * Використання:
 *   const { secondsLeft, isRunning, start, pause, reset } = useCountdown(180)
 *
 * Вимоги — у тестах tests/useCountdown.test.jsx.
 */
export function useCountdown(totalSeconds) {
  const [timer, setTimer] = useState(() => ({
    secondsLeft: totalSeconds,
    isRunning: false,
  }))

  useEffect(() => {
    if (!timer.isRunning) return

    const intervalId = setInterval(() => {
      setTimer((current) => {
        const secondsLeft = Math.max(current.secondsLeft - 1, 0)
        return {
          secondsLeft,
          isRunning: secondsLeft > 0,
        }
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timer.isRunning])

  const start = useCallback(() => {
    setTimer((current) =>
      current.secondsLeft > 0 ? { ...current, isRunning: true } : current,
    )
  }, [])

  const pause = useCallback(() => {
    setTimer((current) => ({ ...current, isRunning: false }))
  }, [])

  const reset = useCallback(() => {
    setTimer({ secondsLeft: totalSeconds, isRunning: false })
  }, [totalSeconds])

  return {
    secondsLeft: timer.secondsLeft,
    isRunning: timer.isRunning,
    start,
    pause,
    reset,
  }
}
