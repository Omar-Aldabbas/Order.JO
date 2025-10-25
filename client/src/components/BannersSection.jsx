import { BANNERS } from '../data/banners'
import { BannerCard } from './cards/BannerCard'

export const BannersSection = () => {
  return (
    <div className="py-5 mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-h-64">
      {BANNERS.map((ban, i) => (
        <BannerCard
          key={i}
            {...ban}
        />
      ))}
    </div>
  )
}
