import { BannersSection } from '../components/BannersSection'
import { CategoriesSection } from '../components/CategoriesSection'
import { FAQSection } from '../components/FAQSection'
import { Footer } from '../components/Footer'
import { GetAppSection } from '../components/GetAppSection'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { OrdersRestaurantsSection } from '../components/OrderRestaurantsSection'
import { RestaurantsSection } from '../components/RestaurantsSection'
import { StatusSection } from '../components/StatusSection'

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
        <BannersSection/>
        <FAQSection/>
        <StatusSection/>
      </div>
      <Footer/>
    </>
  )
}
