import { cn } from '../utils/cn'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Briefcase, Globe } from 'lucide-react'
import { useEffect } from 'react'

export const ModernSlaveryStatement = () => {
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
          Modern Slavery <span className="text-primary">Statement</span>
        </h1>
        <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
          Our commitment to preventing modern slavery and human trafficking
          across our operations and supply chains.
        </p>
      </div>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">1. Our Commitment</h2>
        </div>
        <p>
          <strong>Order.JO</strong> is committed to ensuring that there is no
          modern slavery or human trafficking in our supply chain or in any part
          of our business. We uphold the highest ethical standards and expect
          the same from our partners and suppliers.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">2. Our Supply Chain</h2>
        </div>
        <p>
          We work with a variety of suppliers, including restaurants, couriers,
          and technology providers. All partners are assessed for compliance
          with labor laws, human rights standards, and our zero-tolerance policy
          toward forced labor or exploitation.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">3. Employee Rights</h2>
        </div>
        <p>
          We ensure that all employees are treated fairly, work voluntarily, and
          receive fair compensation. No individual is required to work under
          duress, and all workers have access to channels to report concerns
          confidentially.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">4. Reporting & Compliance</h2>
        </div>
        <p>
          We maintain policies and procedures to detect and prevent modern
          slavery. Any concerns or breaches can be reported anonymously. We
          review our practices annually to ensure ongoing compliance and
          continuous improvement.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">5. Our Responsibility</h2>
        <p>
          We take responsibility for promoting ethical conduct and transparency
          throughout our operations. Our goal is to lead by example and
          encourage our partners and community to adopt responsible practices,
          contributing to a fairer and safer supply chain.
        </p>
      </section>

      <div className="border-t border-mute pt-8 text-center text-sm text-secondary/70">
        <p>
          © {new Date().getFullYear()} Order.JO — Committed to ethical and
          responsible business practices.
        </p>
      </div>
    </section>
  )
}
