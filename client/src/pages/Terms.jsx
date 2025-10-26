import { cn } from '../utils/cn'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  Users,
  ClipboardCheck,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Mail,
} from 'lucide-react'
import { useEffect } from 'react'

export const Terms = () => {
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
          Terms & <span className="text-primary">Conditions</span>
        </h1>
        <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
          Understand the rules and guidelines for using the Order.JO platform.
        </p>
      </div>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
        </div>
        <p>
          Welcome to <strong>Order.JO</strong>. By accessing our platform, you
          agree to comply with these Terms & Conditions. Please read carefully
          before using our services.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">2. Eligibility</h2>
        </div>
        <p>
          You must be at least 18 years old and capable of entering into a legal
          agreement to use our platform.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">
            3. Account Responsibilities
          </h2>
        </div>
        <p>
          Users are responsible for maintaining the confidentiality of their
          account credentials. Any activity under your account is your
          responsibility.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">4. User Conduct</h2>
        </div>
        <p>
          Users must not engage in fraudulent, abusive, or unlawful activities
          on the platform. Violations may result in suspension or termination of
          the account.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">5. Platform Rights</h2>
        </div>
        <p>
          <strong>Order.JO</strong> reserves the right to modify, suspend, or
          terminate services at any time. All intellectual property, content,
          and technology remain our exclusive property.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
        </div>
        <p>
          We may update these Terms & Conditions periodically. Continued use of
          the platform constitutes acceptance of the revised terms.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">7. Contact Us</h2>
        </div>
        <p>
          If you have questions about these Terms & Conditions, contact us at:
        </p>
        <p className="text-primary font-medium">support@order.jo</p>
      </section>

      <div className="border-t border-mute pt-8 text-center text-sm text-secondary/70">
        <p>
          © {new Date().getFullYear()} Order.JO — Your use, your
          responsibility.
        </p>
      </div>
    </section>
  )
}
