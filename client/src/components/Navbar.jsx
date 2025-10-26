import { User, User2 } from 'lucide-react'
// import Logo from '../assets/images/Logo.png'
import LOGO1 from '../assets/images/LOGO1.png'

import { Link, useLocation } from 'react-router-dom'
import { cn } from '../utils/cn'
import { NavbarDesktop } from './NavbarDesktop'
import { NavbarMobile } from './NavbarMobile'

export const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Browse Menu', path: '/menu' },
    { name: 'Special Offers', path: '/Special Offers' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Track Order', path: '/track' },
  ]
  return (
      <>
      <NavbarDesktop/>
      <NavbarMobile/>
      </>
  )
}
