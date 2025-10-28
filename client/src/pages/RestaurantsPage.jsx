import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRestaurants } from '../api/user'
import { RestaurantCard } from '../components/RestaurantCard'

export const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    service_type: '',
  })
  const [availableTypes, setAvailableTypes] = useState([])
  const [availableServices, setAvailableServices] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)
  const navigate = useNavigate()

  const fetchRestaurants = async () => {
    setLoading(true)
    try {
      const res = await getRestaurants({
        search: filters.search,
        type: filters.type,
        service_type: filters.service_type || '',
      })
      setRestaurants(res.restaurants?.data || [])
      setAvailableTypes(res.filters?.types || [])
      setAvailableServices(res.filters?.service_types || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchRestaurants()
    }, 400)
  }, [filters])

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleRestaurantClick = id => {
    navigate(`/restaurants/${id}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-[80vh] px-6 md:px-16 py-8 bg-foreground flex flex-col gap-8">
      <div className="flex flex-wrap gap-4 items-center px-4 md:px-8 py-4 bg-secondary/10 rounded-xl">
        <input
          type="text"
          name="search"
          placeholder="Search restaurants..."
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
          {availableTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <select
          name="service_type"
          className="p-3 rounded-xl bg-foreground/50 text-secondary font-medium border border-secondary/30 hover:border-primary transition"
          value={filters.service_type}
          onChange={handleFilterChange}
        >
          <option value="">All Services</option>
          {availableServices.map((service, idx) => {
            let label =
              service === 'both'
                ? 'Dine-in & Delivery'
                : service === 'order'
                  ? 'Delivery'
                  : 'Dine-in'
            return (
              <option key={idx} value={service}>
                {label}
              </option>
            )
          })}
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="w-12 h-12 border-4 border-order border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && restaurants.length > 0 && (
        <div className="grid gap-6 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {restaurants.map(restaurant => (
            <div
              key={restaurant.id}
              onClick={() => handleRestaurantClick(restaurant.id)}
              className="cursor-pointer"
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      )}

      {!loading && restaurants.length === 0 && (
        <p className="text-center text-secondary font-semibold">
          No restaurants found.
        </p>
      )}
    </div>
  )
}
