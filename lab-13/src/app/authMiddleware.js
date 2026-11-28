// Middleware захищених маршрутів (§4.6).
//
// Middleware маршруту — функція, яку React Router викликає перед тим, як
// показати маршрут: спершу middleware батьківського маршруту, потім
// дочірнього. Вона отримує об'єкт { request, params, context }; адреса, на
// яку йде перехід, — у request.url. Щоб зупинити перехід і відправити
// користувача на іншу адресу, middleware кидає redirect(адреса) з
// 'react-router'. Поточного користувача повертає getUser() з
// '../shared/auth/session.js', безпечну адресу — safeRedirect(to) з
// '../shared/utils/safeRedirect.js'.
import { redirect } from 'react-router'
import { getUser } from '../shared/auth/session.js'
import { safeRedirect } from '../shared/utils/safeRedirect.js'

// Пропускає далі лише користувача, який увійшов. Гостя відправляє на
// /login?redirectTo=…, де redirectTo — шлях і query адреси, яку він
// відкривав, наприклад /booking/s2?from=schedule&row=3.
export function requireUser({ request }) {
  if (!getUser()) {
    const url = new URL(request.url)
    const redirectTo = url.pathname + url.search
    throw redirect(
      `/login?${new URLSearchParams({ redirectTo }).toString()}`,
    )
  }
}

// Пропускає на «Вхід» лише гостя. Користувача, який уже ввійшов, відправляє
// на адресу з redirectTo, пропущену через safeRedirect, а без redirectTo —
// у кабінет: safeRedirect(null) повертає '/account'.
export function guestOnly({ request }) {
  if (getUser()) {
    const url = new URL(request.url)
    throw redirect(safeRedirect(url.searchParams.get('redirectTo')))
  }
}
