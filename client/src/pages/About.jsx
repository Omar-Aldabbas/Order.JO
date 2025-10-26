import { useNavigate } from "react-router-dom"
import { cn } from "../utils/cn"
import {
  ArrowLeft,
  Target,
  BookOpen,
  Cog,
  HeartHandshake,
  Users,
  Rocket,
} from "lucide-react"
import { useEffect } from "react"

export const About = () => {
  const navigate = useNavigate()

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      className={cn(
        "max-w-5xl mx-auto px-8 py-16 animate-fade-in-left",
        "text-secondary space-y-16 leading-relaxed"
      )}
    >
      <div className="w-full mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-foreground font-semibold hover:bg-order transition-all duration-300 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary">
          About <span className="text-primary">Order.JO</span>
        </h1>
        <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
          Delivering food and convenience with speed, reliability, and care — 
          connecting users, restaurants, and couriers in one seamless experience.
        </p>
      </div>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Our Mission</h2>
        </div>
        <p>
          At <strong>Order.JO</strong>, we believe great food should be just a few clicks away. 
          Our mission is to empower local restaurants and make 
          quality dining experiences accessible to everyone — wherever they are.
        </p>
        <p>
          We focus on simplicity, speed, and transparency, ensuring every order 
          — from kitchen to doorstep — feels effortless and satisfying.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Our Story</h2>
        </div>
        <p>
          What started as a small idea to simplify food ordering has grown into 
          a dynamic ecosystem connecting thousands of customers with their favorite 
          restaurants and couriers. 
        </p>
        <p>
          Over time, we’ve partnered with a diverse range of restaurants — from 
          local favorites to international chains — and built a community of 
          dedicated riders who make every delivery count.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Cog className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">How It Works</h2>
        </div>
        <ul className="list-disc list-inside space-y-2 pl-3">
          <li>Users explore restaurants and dishes through our simple interface.</li>
          <li>Restaurants receive and prepare orders in real-time.</li>
          <li>Couriers pick up and deliver meals quickly and safely.</li>
          <li>Notifications keep everyone updated at every step.</li>
        </ul>
        <p>
          It’s a complete ecosystem built to serve — connecting users who crave,
          restaurants that create, and couriers that deliver.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Our Values</h2>
        </div>
        <ul className="list-disc list-inside space-y-2 pl-3">
          <li>
            <strong>Transparency:</strong> Every action, price, and update is clear and fair.
          </li>
          <li>
            <strong>Community:</strong> We uplift local restaurants and create
            income opportunities for riders.
          </li>
          <li>
            <strong>Innovation:</strong> We evolve with technology to
            offer the smoothest experience possible.
          </li>
          <li>
            <strong>Sustainability:</strong> We’re committed to eco-conscious
            delivery and packaging options.
          </li>
        </ul>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Join Our Journey</h2>
        </div>
        <p>
          Whether you’re a restaurant looking to expand your reach, a rider
          searching for flexible work, or a user who simply loves great food — 
          <strong> Order.JO </strong> welcomes you to be part of our story.
        </p>
        <p>
          Together, we’re redefining how food moves across cities — one order at a time.
        </p>
      </section>

      <div className="border-t border-mute pt-8 text-center text-sm text-secondary/70">
        <p>
          © {new Date().getFullYear()} Order.JO — Built with passion, powered by people.
        </p>
      </div>
    </section>
  )
}
