import { Link, useLocation } from 'react-router-dom'
import { User, User2 } from 'lucide-react'
// import Logo from '../assets/images/Logo.png'
import LOGO1 from '../assets/images/LOGO1.png'

import { cn } from '../utils/cn'

export const NavbarDesktop = () => {
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Browse Menu', path: '/menu' },
    { name: 'Special Offers', path: '/Special Offers' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Track Order', path: '/orders' },
  ]
  return (
    <nav className="hidden sticky top-0 left-0 z-50 bg-foreground/30 backdrop-blur-2xl px-3 py-5 xl:flex flex-row justify-around items-center">
      <h1 className="font-bold text-6xl tracking-tighter relative ">
        Order{' '}
        <span className="tracking-tight -rotate-90 inline-block bg-primary text-lg px-1 -ml-2 min-w-8 -top-3 relative">
          .JO
        </span>
      </h1>
      {/* <img src={LOGO1} alt="logo" className="object-cover object-center" /> */}

      <ul className="text-md font-medium text-secondary flex-row flex justify-around min-w-[70%] items-center">
        {navItems.map(item => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={cn(
                'text-secondary py-3 px-7',
                location.pathname === item.path
                  ? ' rounded-full bg-primary text-foreground'
                  : 'hover:rounded-full hover:bg-primary hover:text-foreground transition-all duration-400'
              )}
            >
              {' '}
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/login"
            className="bg-secondary hover:bg-mute hover:shadow-inner active:bg-mute active:shadow-inner rounded-full flex flex-row items-center justify-center gap-2 py-3 px-7 transition-all duration-400"
          >
            <User2
              size={25}
              fill="currentColor"
              className="p-1 rounded-full text-secondary bg-primary"
            />
            <span className="inline-block text-foreground">Login/Signup</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
