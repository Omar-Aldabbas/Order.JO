import { useInView } from '../hooks/useInView'
import { CATEGORIES } from "../data/categories";
import { CategoryCard } from "./cards/categoryCard";

export const CategoriesSection = () => {
  const [ref, isVisible] = useInView({ threshold: 0.3 })
  return (
    <div>
      <h2 className='text-secondary font-semibold text-3xl p-5'>Order.JO's Popular categories</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>

        {
            CATEGORIES.map((cat) => (
                <CategoryCard key={cat.slug} options={{
                    img: cat.img,
                    alt: cat.alt,
                    name:cat.name,
                    additiontext: cat.additiontext,
                }}/>
            ))
        }
      </div>
    </div>
  )
}
