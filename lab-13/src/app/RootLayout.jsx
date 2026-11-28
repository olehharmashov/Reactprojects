import { Link, NavLink, Outlet } from 'react-router'
import { signOut, useUser } from '../shared/auth/session.js'

// Спільний макет сайту: шапка над сторінкою дочірнього маршруту.
export default function RootLayout() {
  const user = useUser()

  function handleSignOut() {
    signOut()
    // §4.6: після виходу — перехід на «Афішу».
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
