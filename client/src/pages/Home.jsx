import { Hero } from "../components/Hero"
import { Navbar } from "../components/Navbar"

export const Home = () => {
  return (
    <>
    <div className="px-8">
                <Navbar/>
        <Hero/>
      <h1>Home page</h1>
    </div>
    </>
  )
}
