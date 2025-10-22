import { CategoriesSection } from '../components/CategoriesSection'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { RestaurantsSection } from '../components/RestaurantsSection'

export const Home = () => {
  return (
    <>
      <div className="px-8">
        <Navbar />
        <Hero />
        <RestaurantsSection />
        <CategoriesSection/>
        <h1>Home page</h1>
      </div>
    </>
  )
}
