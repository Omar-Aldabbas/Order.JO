import { Link, useLocation } from 'react-router-dom'
import { cn } from '../utils/cn'
import { useState, useEffect } from 'react'
import { Menu, User2 } from 'lucide-react'
import { CgClose } from 'react-icons/cg'

export const NavbarMobile = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Browse Menu', path: '/menu' },
    { name: 'Special Offers', path: '/Special Offers' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Orders', path: '/orders' },
  ]

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(prev => !prev)

  return (
    <nav className="sticky top-0 left-0 z-50 backdrop-blur-2xl flex justify-between items-center px-5 py-4 xl:hidden bg-background/50">
      <h1 className="font-bold text-4xl relative tracking-tighter">
        Order{' '}
        <span className="inline-block -rotate-90 bg-primary text-sm px-1 -ml-2 min-w-8 -top-3 relative">
          .JO
        </span>
      </h1>

      <Menu size={35} onClick={toggleMenu} className="cursor-pointer" />

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen z-50 bg-background/95 bg-blend-soft-light flex flex-col justify-center items-center gap-6 animate-fade-in">
          <CgClose
            size={35}
            onClick={toggleMenu}
            className="absolute top-6 right-6 cursor-pointer"
          />

          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={toggleMenu}
              className={cn(
                'text-secondary text-2xl py-3 px-7 transition-all duration-200 rounded-full ',
                location.pathname === item.path
                  ? 'rounded-full bg-primary text-foreground'
                  : 'hover:bg-primary hover:text-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/about"
            onClick={toggleMenu}
            className={cn(
              'text-secondary text-2xl py-3 px-7 transition-all duration-200',
              location.pathname === '/about'
                ? 'rounded-full bg-primary text-foreground'
                : 'hover:bg-primary hover:text-foreground'
            )}
          >
            About
          </Link>

          <Link
            to="/login"
            className="bg-secondary hover:bg-mute hover:shadow-inner active:bg-mute active:shadow-inner rounded-full flex items-center gap-2 py-3 px-7 transition-all duration-200"
          >
            <User2
              size={25}
              fill="currentColor"
              className="p-1 rounded-full text-secondary bg-primary"
            />
            <span className="text-foreground">Login/Signup</span>
          </Link>
        </div>
      )}
    </nav>
  )
}
