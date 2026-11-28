import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { signIn } from '../../shared/auth/session.js'
import { safeRedirect } from '../../shared/utils/safeRedirect.js'

export default function LoginPage() {
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setError(null)
    setPending(true)
    try {
      await signIn(form.get('email'), form.get('password'))
      navigate(safeRedirect(searchParams.get('redirectTo')), {
        replace: true,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="login">
      <h1>Вхід</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Пошта
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Пароль
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="button" disabled={pending}>
          {pending ? 'Вхід…' : 'Увійти'}
        </button>
      </form>
    </section>
  )
}
