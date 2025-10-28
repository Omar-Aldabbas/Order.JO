import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Splash } from './pages/Splash'
import { NotFound } from './pages/NotFound'
import { Register } from './pages/Register'
import { Toaster } from 'sonner'
import { Login } from './pages/Login'
import { Forgot } from './pages/Forgot'
import { Verification } from './pages/Verification'
import { Home } from './pages/Home'
import { MainLayout } from './layouts/MainLayout'
import { About } from './pages/About'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { CookiesPolicy } from './pages/Cookies'
import { ModernSlaveryStatement } from './pages/Statement'
import { HelpPage } from './pages/Support'
import { AwardsPromotions } from './pages/Awards'
import { RegisterDriver } from './pages/user/RegisterDriver'
import { RegisterOwner } from './pages/user/RegisterOwner'
import { Menu } from './pages/Menu'
import { UserProfile } from './pages/user/UserProfile'
import { RestaurantPage } from './pages/RestaurantPage'
import { CartPage } from './pages/CartPage'

import { NotificationsProvider } from './NotificationsProvider'
import { DebugBroadcast } from './components/DebugBroadcast'
import { RestaurantsPage } from './pages/RestaurantsPage'
import { OrdersPage } from './pages/OrdersPage'
import { MyRestaurant } from './pages/owner/MyRestaurant'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* wrap with auth layout  */}
      <Route index element={<Splash />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="verify" element={<Verification />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="terms" element={<Terms />} />
      <Route path="cookies" element={<CookiesPolicy />} />
      <Route path="statement" element={<ModernSlaveryStatement />} />
      <Route path="register/rider" element={<RegisterDriver />} />
      <Route path="register/owner" element={<RegisterOwner />} />

      {/* Mianlayout */}
      <Route element={<MainLayout />}>
        <Route path="about" element={<About />} />
        <Route path="home" element={<Home />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="awards" element={<AwardsPromotions />} />
        <Route path="menu" element={<Menu />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="restaurant/:id" element={<RestaurantPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="restaurants" element={<RestaurantsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="myrestaurant" element={<MyRestaurant />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <DebugBroadcast />
      <NotificationsProvider>
        <Toaster position="top-center" richColors duration={3000} />
        <RouterProvider router={router} />
      </NotificationsProvider>
    </>
  )
}

export default App
