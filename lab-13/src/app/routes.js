import RootLayout from './RootLayout.jsx'
import { guestOnly, requireUser } from './authMiddleware.js'
import HydrateFallback from '../shared/components/HydrateFallback.jsx'
import NotFoundPage from '../shared/components/NotFoundPage.jsx'
import AccountLayout from '../routes/account/AccountLayout.jsx'
import ProfilePage from '../routes/account/ProfilePage.jsx'
import TicketsPage from '../routes/account/TicketsPage.jsx'
import BookingPage from '../routes/booking/BookingPage.jsx'
import LoginPage from '../routes/login/LoginPage.jsx'
import MoviePage from '../routes/movie/MoviePage.jsx'
import MoviesPage from '../routes/movies/MoviesPage.jsx'
import SchedulePage from '../routes/schedule/SchedulePage.jsx'

// Маршрути сайту: масив об'єктів маршрутів React Router, з якого
// App.jsx створює роутер. Сторінки — компоненти в `Component`, тож цей
// файл обходиться без JSX.
export const routes = [
  {
    path: '/',
    Component: RootLayout,
    HydrateFallback,
    children: [
      { index: true, Component: MoviesPage },
      { path: 'movies/:movieId', Component: MoviePage },
      { path: 'schedule', Component: SchedulePage },
      {
        middleware: [requireUser],
        children: [
          {
            path: 'account',
            Component: AccountLayout,
            children: [
              { index: true, Component: ProfilePage },
              { path: 'tickets', Component: TicketsPage },
            ],
          },
          { path: 'booking/:sessionId', Component: BookingPage },
        ],
      },
      { path: 'login', middleware: [guestOnly], Component: LoginPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]
