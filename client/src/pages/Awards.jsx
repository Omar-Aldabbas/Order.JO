import { useEffect } from 'react'
import { cn } from '../utils/cn'
import { Trophy, Gift, Star, Calendar, AlertCircle } from 'lucide-react'

export const AwardsPromotions = () => {
  const promotions = [
    {
      id: 1,
      title: 'Rider of the Month',
      icon: <Trophy className="w-6 h-6 text-primary" />,
      description:
        'Celebrating the top performing rider with the highest number of deliveries this month.',
    },
    {
      id: 2,
      title: 'Referral Bonus',
      icon: <Gift className="w-6 h-6 text-primary" />,
      description:
        'Invite friends to Order.JO and earn a bonus for each successful registration and order.',
    },
    {
      id: 3,
      title: 'Top Restaurant Partner',
      icon: <Star className="w-6 h-6 text-primary" />,
      description:
        'Recognizing restaurants with outstanding service and customer ratings.',
    },
    {
      id: 4,
      title: 'Seasonal Promotions',
      icon: <Calendar className="w-6 h-6 text-primary" />,
      description:
        'Special discounts and offers during holidays or seasonal events.',
    },
  ]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section
      className={cn(
        'max-w-6xl mx-auto px-6 py-16 space-y-12',
        'text-secondary animate-fade-in-left'
      )}
    >
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary">
          Awards & Promotions
        </h1>
        <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
          Discover how we celebrate excellence and offer exciting opportunities
          for our users, riders, and restaurant partners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {promotions.map(promo => (
          <div
            key={promo.id}
            className="flex flex-col items-start gap-4 p-6 rounded-xl bg-foreground shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-3">
              {promo.icon}
              <h2 className="text-xl font-semibold text-secondary">
                {promo.title}
              </h2>
            </div>
            <p className="text-secondary/80">{promo.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-mute/50 p-6 rounded-xl space-y-4 text-secondary/80">
        <h2 className="text-2xl font-semibold text-secondary">
          How to Participate
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Riders: Complete deliveries and maintain high ratings to qualify for
            rewards.
          </li>
          <li>
            Restaurants: Provide excellent service, maintain quality, and
            participate in promotional events.
          </li>
          <li>
            Users: Engage with our platform, refer friends, and check our
            promotions regularly for bonuses and discounts.
          </li>
        </ul>
        <p className="text-secondary/80">
          Keep an eye on our platform and notifications to never miss a chance
          to earn rewards or enjoy exclusive promotions!
        </p>
      </div>

      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-900 p-6 rounded-xl border border-yellow-300">
        <AlertCircle className="w-6 h-6" />
        <span className="text-lg font-semibold">
          Note: This section is still under development and not fully
          implemented yet.
        </span>
      </div>

      <div className="border-t border-muted p-2 text-center text-sm text-secondary/70">
        <p>Order.JO — Rewards, recognition, and promotions for everyone.</p>
      </div>
    </section>
  )
}
