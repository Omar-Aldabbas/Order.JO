import { useState, useEffect } from 'react'
import { ClockIcon } from 'lucide-react'
import { toast } from 'sonner'

const formatTime = (time24) => {
  if (!time24) return null
  const [hourStr, minute] = time24.split(':')
  let hour = parseInt(hourStr, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12
  return `${hour}:${minute} ${ampm}`
}

const formatRange = (range) => {
  if (!range) return null
  const [start, end] = range.split('-')
  const startFormatted = formatTime(start)
  const endFormatted = formatTime(end)
  return startFormatted && endFormatted ? `${startFormatted} - ${endFormatted}` : null
}

export const WorkingHoursSection = ({ restaurant }) => {
  const [hours, setHours] = useState(null)

  useEffect(() => {
    if (restaurant?.operating_hours) {
      try {
        const parsed =
          typeof restaurant.operating_hours === 'string'
            ? JSON.parse(restaurant.operating_hours)
            : restaurant.operating_hours
        setHours(parsed)
      } catch (err) {
        console.error('Failed to parse operating hours:', err)
        toast.error('Failed to load operating hours')
        setHours(null)
      }
    } else {
      setHours(null)
    }
  }, [restaurant])

  if (!hours || Object.keys(hours).length === 0)
    return (
      <section className="w-full flex flex-col gap-4 mt-8 p-3 items-center justify-center">
        <ClockIcon className="w-12 h-12 text-gray-400" />
        <p className="text-gray-500 text-lg">Working hours not available</p>
      </section>
    )

  return (
    <section className="w-full flex flex-col gap-4 mt-8">
      <h2 className="text-2xl font-bold text-secondary">Working Hours</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
        {Object.entries(hours).map(([day, time]) => (
          <div
            key={day}
            className="flex flex-col items-center justify-center border rounded-xl p-4 bg-gray-50 hover:shadow transition"
          >
            <span className="font-semibold text-gray-700">{day}</span>
            <span className="text-gray-500">
              {formatRange(time) || 'Closed'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
