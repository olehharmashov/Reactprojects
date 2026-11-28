import RootLayout from './RootLayout.jsx'
import NotFoundPage from '../shared/components/NotFoundPage.jsx'
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
    children: [
      { index: true, Component: MoviesPage },
      { path: 'movies/:movieId', Component: MoviePage },
      { path: 'schedule', Component: SchedulePage },
      { path: 'login', Component: LoginPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]
