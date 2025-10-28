import { useState, useEffect } from 'react'
import {
  getCart,
  placeOrder,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../api/user'
import { toast } from 'sonner'
import { Trash2, Plus, Minus, Coffee, Star, ShoppingCart } from 'lucide-react'

export const CartPage = () => {
  const [restaurant, setRestaurant] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderType, setOrderType] = useState('delivery')
  const [note, setNote] = useState('')
  const [placingOrder, setPlacingOrder] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    setLoading(true)
    try {
      const data = await getCart()
      setItems(data || [])
      const firstItem = data?.[0]
      if (firstItem) {
        setRestaurant(
          firstItem.restaurant || firstItem.menu_item?.restaurant || null
        )
      } else {
        setRestaurant(null)
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return
    setItems(prev => prev.map(i => (i.id === itemId ? { ...i, quantity } : i)))
    try {
      await updateCartItem(itemId, { quantity })
    } catch {
      fetchCart()
    }
  }

  const handleRemove = async itemId => {
    setItems(prev => prev.filter(i => i.id !== itemId))
    try {
      await removeCartItem(itemId)
    } catch {
      fetchCart()
    }
  }

  const handleClearCart = async () => {
    setItems([])
    setRestaurant(null)
    try {
      await clearCart()
      toast.success('Cart cleared')
    } catch {
      fetchCart()
    }
  }

  const subtotal = items.reduce(
    (acc, item) =>
      acc + (item.price ?? item.menu_item?.price ?? 0) * (item.quantity ?? 0),
    0
  )
  const taxRate = 0.05
  const tax = subtotal * taxRate
  const total = subtotal + tax

  const handlePlaceOrder = async () => {
    if (!items.length) return
    setPlacingOrder(true)
    try {
      const restaurantId =
        restaurant?.id ||
        items[0]?.menu_item?.restaurant_id ||
        items[0]?.restaurant_id
      if (!restaurantId) throw new Error('Restaurant not found')
      await placeOrder({
        restaurant_id: restaurantId,
        type: orderType,
        note,
        items: items.map(i => ({
          menu_item_id: i.menu_item_id ?? i.menu_item?.id,
          menu_item_variant_id: i.menu_item_variant_id ?? null,
          quantity: i.quantity ?? 1,
        })),
      })
      toast.success('Order placed successfully!')
      setItems([])
      setRestaurant(null)
    } catch (err) {
      toast.error(err.message || 'Failed to place order')
    } finally {
      setPlacingOrder(false)
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted animate-pulse">Loading your cart...</p>
      </div>
    )

  if (!items.length)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
        <ShoppingCart className="w-20 h-20 text-muted animate-spin mb-4" />
        <p className="text-muted text-lg">Your cart is empty</p>
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="relative w-full h-52 bg-gradient-to-r from-primary to-order rounded-2xl flex flex-col items-center justify-center shadow-lg overflow-hidden">
        <Coffee className="absolute w-16 h-16 text-white opacity-20 animate-bounce-slow top-10 left-20" />
        <Star className="absolute w-12 h-12 text-white opacity-10 animate-spin-slow top-16 right-28" />
        <ShoppingCart className="absolute w-24 h-24 opacity-10 animate-spin-slow z-0" />
        <h1 className="text-5xl font-extrabold text-white z-10">Your Cart</h1>
      </div>

      {restaurant && (
        <div className="p-4 border border-mute rounded-2xl bg-gray-50 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-secondary">
            {restaurant.name}
          </h3>
          <p className="text-muted">{restaurant.address}</p>
          <p className="text-muted capitalize">{restaurant.type}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map(item => (
          <div
            key={item.id}
            className="flex flex-col p-4 border border-mute rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-200"
          >
            <h4 className="font-semibold text-secondary text-center mb-1">
              {item.menu_item?.name}
            </h4>
            {item.menu_item_variant_id && (
              <p className="text-muted text-sm text-center mb-2">
                Variant:{' '}
                {
                  item.menu_item?.variants?.find(
                    v => v.id === item.menu_item_variant_id
                  )?.name
                }
              </p>
            )}
            <p className="text-gray-700 font-semibold text-center mb-3">
              ${item.price ?? item.menu_item?.price ?? 0}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="p-2 rounded-lg bg-mute hover:bg-order hover:text-foreground transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="p-2 rounded-lg bg-mute hover:bg-order hover:text-foreground transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="p-2 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border border-mute rounded-2xl bg-gray-50 shadow-sm space-y-3 text-secondary">
        <div className="flex justify-between text-sm sm:text-base">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t border-mute pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <select
          className="p-3 border border-mute rounded-xl focus:ring-2 focus:ring-primary outline-none"
          value={orderType}
          onChange={e => setOrderType(e.target.value)}
        >
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
        </select>
        <textarea
          className="p-3 border border-mute rounded-xl min-h-[100px] focus:ring-2 focus:ring-primary outline-none"
          placeholder="Add a note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleClearCart}
          className="w-1/3 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-order transition"
        >
          Clear
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={placingOrder}
          className="flex-1 py-3 rounded-xl bg-order text-foreground font-bold tracking-wide hover:bg-primary transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}
