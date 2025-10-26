import { cn } from '../utils/cn'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Cookie, Settings, BarChart2, Mail } from 'lucide-react'
import { useEffect } from 'react'

export const CookiesPolicy = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  
  return (
    <section
      className={cn(
        'max-w-5xl mx-auto px-8 py-16 animate-fade-in-left',
        'text-secondary space-y-16 leading-relaxed'
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
          Cookies <span className="text-primary">Policy</span>
        </h1>
        <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
          Learn how Order.JO uses cookies and similar technologies to enhance
          your experience.
        </p>
      </div>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Cookie className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">1. What Are Cookies?</h2>
        </div>
        <p>
          Cookies are small text files stored on your device when you visit
          websites. They help us remember preferences, improve functionality,
          and analyze usage.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">2. How We Use Cookies</h2>
        </div>
        <ul className="list-disc list-inside space-y-2">
          <li>To remember your login details and preferences.</li>
          <li>To analyze website traffic and improve performance.</li>
          <li>To provide personalized recommendations and offers.</li>
          <li>To ensure smooth and secure navigation of our platform.</li>
        </ul>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">3. Types of Cookies</h2>
        </div>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Essential Cookies:</strong> Required for basic platform
            functionality.
          </li>
          <li>
            <strong>Performance Cookies:</strong> Help us understand user
            interactions and improve our services.
          </li>
          <li>
            <strong>Functional Cookies:</strong> Remember preferences and
            enhance user experience.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Used to provide relevant
            promotions and offers.
          </li>
        </ul>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">4. Managing Cookies</h2>
        </div>
        <p>
          You can manage or disable cookies in your browser settings. Please
          note that some features of the platform may not function properly if
          cookies are disabled.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">5. Contact Us</h2>
        </div>
        <p>For any questions regarding our Cookies Policy, contact us at:</p>
        <p className="text-primary font-medium">privacy@order.jo</p>
      </section>

      <div className="border-t border-mute pt-8 text-center text-sm text-secondary/70">
        <p>
          © {new Date().getFullYear()} Order.JO — Your privacy, your control.
        </p>
      </div>
    </section>
  )
}
