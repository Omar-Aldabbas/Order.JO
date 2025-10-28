import { useEffect, useState } from 'react'
import { getOrderHistory, cancelOrder } from '../api/user'
import { MapPin, Truck, Clock, Trash2 } from 'lucide-react'

const statusColors = {
  pending: 'bg-yellow-400 text-secondary',
  accepted: 'bg-blue-400 text-foreground',
  preparing: 'bg-purple-500 text-foreground',
  ready: 'bg-indigo-500 text-foreground',
  waiting_for_pickup: 'bg-orange-400 text-foreground',
  courier_assigned: 'bg-teal-400 text-foreground',
  picked_up: 'bg-sky-500 text-foreground',
  delivering: 'bg-cyan-400 text-foreground',
  delivered: 'bg-green-500 text-foreground',
  canceled_user: 'bg-red-500 text-foreground',
  canceled_restaurant: 'bg-red-600 text-foreground',
}

const OrderCard = ({ order, onCancel }) => {
  const isActive = !['delivered', 'canceled_user', 'canceled_restaurant'].includes(order.status)
  const canCancel = ['pending', 'accepted', 'preparing'].includes(order.status)

  return (
    <div className="flex flex-col border border-secondary/20 rounded-xl overflow-hidden shadow hover:shadow-lg transition w-full">
      <div className={`flex justify-between items-center p-4 ${isActive ? 'bg-foreground' : 'bg-secondary/5'}`}>
        <h3 className="font-bold text-lg text-secondary">{order.restaurant_name || 'Restaurant'}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-300 text-secondary'}`}>
          {order.status.replace(/_/g, ' ').toUpperCase()}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-secondary/80">
          <MapPin size={16} />
          <span>{order.to_address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-secondary/80">
          <Truck size={16} />
          <span>{order.type.charAt(0).toUpperCase() + order.type.slice(1)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold text-order">${Number(order.total_price).toFixed(2)}</span>
          {canCancel && (
            <button onClick={() => onCancel(order.id)} className="flex items-center gap-1 px-2 py-1 bg-red-500 text-foreground rounded hover:bg-red-600 transition text-sm">
              <Trash2 size={16} /> Cancel
            </button>
          )}
          {isActive && !canCancel && <Clock size={20} className="animate-spin text-primary" />}
        </div>
      </div>
    </div>
  )
}

export const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await getOrderHistory()
      setOrders(res.orders || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleCancel = async orderId => {
    try {
      await cancelOrder(orderId)
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'canceled_user' } : o))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchOrders()
  }, [])

  const activeOrders = orders.filter(o => !['delivered', 'canceled_user', 'canceled_restaurant'].includes(o.status))
  const pastOrders = orders.filter(o => ['delivered', 'canceled_user', 'canceled_restaurant'].includes(o.status))

  return (
    <div className="min-h-[80vh] flex flex-col gap-8 px-6 md:px-16 py-8 bg-foreground">
      <div className="bg-order text-foreground rounded-xl p-8 flex flex-col items-center justify-center text-center gap-2">
        <h1 className="text-3xl font-bold">Order.Jo</h1>
        <p className="text-lg font-medium">Track Your Orders in Real-Time</p>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-secondary">Active Orders</h2>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-12 h-12 border-4 border-order border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : activeOrders.length ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {activeOrders.map(order => <OrderCard key={order.id} order={order} onCancel={handleCancel} />)}
          </div>
        ) : (
          <p className="text-center text-secondary font-semibold">No active orders</p>
        )}
      </div>

      <div className="flex flex-col gap-6 mt-8">
        <h2 className="text-xl font-bold text-secondary">Order History</h2>
        {loading ? null : pastOrders.length ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {pastOrders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        ) : (
          <p className="text-center text-secondary font-semibold">No past orders</p>
        )}
      </div>
    </div>
  )
}
