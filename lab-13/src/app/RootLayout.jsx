import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { signOut, useUser } from '../shared/auth/session.js'

// Спільний макет сайту: шапка над сторінкою дочірнього маршруту.
export default function RootLayout() {
  const user = useUser()
  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  return (
    <div className="site">
      <header className="site-header">
        <Link className="brand" to="/">
          Кінотеатр
        </Link>
        <nav aria-label="Основна навігація">
          <ul className="site-nav">
            <li>
              <NavLink to="/">Афіша</NavLink>
            </li>
            <li>
              <NavLink to="/schedule">Розклад</NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink to="/account">Кабінет</NavLink>
                </li>
                <li>
                  <button type="button" onClick={handleSignOut}>
                    Вийти
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login">Увійти</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}
