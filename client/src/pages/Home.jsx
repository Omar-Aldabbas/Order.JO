import { BannersSection } from '../components/BannersSection'
import { CategoriesSection } from '../components/CategoriesSection'
import { FAQSection } from '../components/FAQSection'
import { GetAppSection } from '../components/GetAppSection'
import { Hero } from '../components/Hero'
import { OrdersRestaurantsSection } from '../components/OrderRestaurantsSection'
import { RestaurantsSection } from '../components/RestaurantsSection'
import { StatusSection } from '../components/StatusSection'

export const Home = () => {
  return (
    <>
      <div className="px-8">
        <Hero />
        <RestaurantsSection />
      </div>
      <CategoriesSection />
      <div className="px-8">
        <OrdersRestaurantsSection />
        <GetAppSection />
        <BannersSection />
        <FAQSection />
        <StatusSection />
      </div>
    </>
  )
}
