import { CategoriesSection } from '../components/CategoriesSection'
import { GetAppSection } from '../components/GetAppSection'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { OrdersRestaurantsSection } from '../components/OrderRestaurantsSection'
import { RestaurantsSection } from '../components/RestaurantsSection'

export const Home = () => {
  return (
    <>
      <div className="px-8">
        <Navbar />
        <Hero />
        <RestaurantsSection />
        <h1>Home page</h1>
      </div>
      <CategoriesSection />

      <div className="px-8">
        <OrdersRestaurantsSection/>
        <GetAppSection/>
      </div>
    </>
  )
}
