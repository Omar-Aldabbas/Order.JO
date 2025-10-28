import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getMenu, getRestaurants } from '../api/user'

export const Menu = () => {
  const [restaurants, setRestaurants] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    price_order: '',
    has_variants: '',
    restaurant_id: '',
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    const typeFromParams = searchParams.get('type') || ''
    if (typeFromParams) {
      setFilters(prev => ({ ...prev, type: typeFromParams }))
    }
  }, [searchParams])

  useEffect(() => {
    fetchMenu()
  }, [filters])

  const fetchRestaurants = async () => {
    try {
      const res = await getRestaurants()
      setRestaurants(res.restaurants?.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const fetchMenu = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getMenu(filters.restaurant_id, filters)
      setMenuItems(res.data || [])
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to fetch menu')
    }
    setLoading(false)
  }

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleRestaurantChange = e => {
    const restId = e.target.value
    setFilters({ ...filters, restaurant_id: restId })
  }

  const handleItemClick = restaurantId => {
    navigate(`/restaurant/${restaurantId}`)
  }

  return (
    <div className="min-h-[80vh] px-6 md:px-16 py-8 bg-foreground flex flex-col gap-8">
      <div className="flex flex-wrap gap-4 items-center px-4 md:px-8 py-4 bg-secondary/10 rounded-xl">
        <select
          className="p-3 rounded-xl bg-foreground text-secondary font-medium border border-secondary/30 hover:border-primary transition"
          value={filters.restaurant_id}
          onChange={handleRestaurantChange}
        >
          <option value="">Select a Restaurant</option>
          {restaurants.map(r => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="search"
          placeholder="Search menu items..."
          className="p-3 rounded-xl flex-1 min-w-[200px] bg-foreground/50 text-secondary placeholder-secondary font-medium border border-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary transition"
          value={filters.search}
          onChange={handleFilterChange}
        />

        <select
          name="type"
          className="p-3 rounded-xl bg-foreground/50 text-secondary font-medium border border-secondary/30 hover:border-primary transition"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="burger">Burger</option>
          <option value="pizza">Pizza</option>
          <option value="shawarma">Shawarma</option>
          <option value="salad">Salad</option>
          <option value="soup">Soup</option>
        </select>

        <select
          name="price_order"
          className="p-3 rounded-xl bg-foreground/50 text-secondary font-medium border border-secondary/30 hover:border-primary transition"
          value={filters.price_order}
          onChange={handleFilterChange}
        >
          <option value="">Price Order</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <select
          name="has_variants"
          className="p-3 rounded-xl bg-foreground/50 text-secondary font-medium border border-secondary/30 hover:border-primary transition"
          value={filters.has_variants}
          onChange={handleFilterChange}
        >
          <option value="">All Items</option>
          <option value="1">Has Variants</option>
          <option value="0">Single Item</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="w-12 h-12 border-4 border-order border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {!loading && !error && menuItems.length === 0 && (
        <p className="text-center text-secondary font-semibold">
          No items found.
        </p>
      )}

      {!loading && menuItems.length > 0 && (
        <div className="grid gap-6 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.restaurant_id)}
              className="bg-foreground rounded-xl border border-secondary/20 transition hover:shadow-md hover:translate-y-[1px] cursor-pointer overflow-hidden flex flex-col"
            >
              <img
                src={item.image || '/placeholder.png'}
                alt={item.name}
                className="h-44 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                <div>
                  <h3 className="font-bold text-lg text-secondary">
                    {item.name}
                  </h3>
                  {item.restaurant_name && (
                    <p className="text-sm text-primary/80">
                      {item.restaurant_name}
                    </p>
                  )}
                  {item.type && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-order text-foreground rounded-full">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  )}
                  {item.description && (
                    <p className="text-sm text-secondary/80 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-order font-semibold text-lg">
                    {item.price ? `$${item.price}` : ''}
                  </p>
                  {item.has_variants ? (
                    <span className="text-primary font-medium text-sm">
                      See Options
                    </span>
                  ) : (
                    <span className="text-gray-400 font-medium text-sm"></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
