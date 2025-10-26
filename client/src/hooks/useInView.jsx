import { useEffect, useMemo, useRef, useState } from 'react'

export const useInView = (options = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const defaultOptions = { threshold: 0.3 }
  const memOptions = useMemo(
    () => ({ ...defaultOptions, ...options }),
    [options]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        obs.unobserve(entry.target)
      }
    }, memOptions)

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [memOptions])

  return [ref, isVisible]
}
