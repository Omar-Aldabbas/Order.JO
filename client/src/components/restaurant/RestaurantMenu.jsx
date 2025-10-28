import { useState, useEffect } from 'react'
import { getMenu } from '../../api/user'
import { toast } from 'sonner'
import { MenuCard } from './components/MenuCard'
import { MenuCardSkeleton } from './skeletons/MenuCardSkeleton'

export const MenuSection = ({ restaurantId }) => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const fetchMenu = async (pageNumber = 1, reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMenu(restaurantId, { page: pageNumber })
      setMenuItems(prev =>
        reset ? data.data || [] : [...prev, ...(data.data || [])]
      )
      setPage(data.current_page || 1)
      setLastPage(data.last_page || 1)
    } catch (err) {
      const message = err?.message || 'Failed to load menu'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (restaurantId) fetchMenu(1, true)
  }, [restaurantId])

  const loadMore = () => {
    if (page >= lastPage || loading) return
    fetchMenu(page + 1)
  }

  if (loading && menuItems.length === 0)
    return (
      <section className="w-full flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-bold text-secondary">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <MenuCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )

  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>

  return (
    <section className="w-full flex flex-col gap-6 mt-8">
      <h2 className="text-2xl font-bold text-secondary">Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {page < lastPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-primary text-foreground rounded-xl hover:bg-order transition"
          >
            Load More
          </button>
        </div>
      )}

      {loading && menuItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <MenuCardSkeleton key={i} />
          ))}
        </div>
      )}
    </section>
  )
}
