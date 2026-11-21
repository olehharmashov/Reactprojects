import { useCart } from '../model/useCart.js'
import { paths } from '../../../shared/config/index.js'
import Link from '../../../shared/ui/Link.jsx'

export function CartIndicator() {
  const { count } = useCart()

  return (
    <Link to={paths.cart()} className="cart-link">
      Кошик ({count})
    </Link>
  )
}
