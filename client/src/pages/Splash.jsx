import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import  Starter  from '../assets/images/Starter.png'

export const Splash = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/register') // TODO: change it to login after making the page
    }, 1500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-foreground z-10 absolute">
        Order.Jo
      </h1>

      <svg
        className="w-40 h-40"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" fill="#ffd88c" />

        <path
          d="M0,0 L100,0 L100,70 L0,100 Z"
          fill="url(#beamGradient)"
          opacity="0.8"
        />

        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd88c" />
            <stop offset="100%" stopColor="#ff7622" />
          </linearGradient>
        </defs>
      </svg>

      {/* <img src={Starter} alt="decorative" className="mix-blend-multiply" /> */}
    </div>
  )
}
