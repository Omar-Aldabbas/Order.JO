import { cn } from "../utils/cn"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ShieldCheck,
  Info,
  Database,
  Key,
  Bell,
  Cookie,
  RefreshCw,
  Mail,
  Users,
} from "lucide-react"
import { useEffect } from "react"

export const Privacy = () => {
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
          Privacy <span className="text-primary">Policy</span>
        </h1>
        <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
          Your privacy matters. Learn how Order.JO collects, uses, and protects your information.
        </p>
      </div>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
        </div>
        <p>
          This Privacy Policy explains how <strong>Order.JO</strong> (“we”, “our”, or “us”)
          collects, uses, stores, and protects your personal information when you use our platform.
        </p>
        <p>
          By accessing or using our website, app, or services, you agree to the terms of this Privacy Policy.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
        </div>
        <ul className="list-disc list-inside space-y-2 pl-3">
          <li><strong>Account Details:</strong> Name, email, phone, password.</li>
          <li><strong>Location Data:</strong> To connect you with nearby restaurants and couriers.</li>
          <li><strong>Order Information:</strong> History, preferences, payment info.</li>
          <li><strong>Device Information:</strong> Browser, OS, IP address.</li>
        </ul>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
        </div>
        <ul className="list-disc list-inside space-y-2 pl-3">
          <li>Process and deliver your orders.</li>
          <li>Personalize your experience and recommendations.</li>
          <li>Communicate updates, offers, and notifications.</li>
          <li>Improve platform performance and detect fraud.</li>
        </ul>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">4. Sharing of Information</h2>
        </div>
        <p>We may share your information only with:</p>
        <ul className="list-disc list-inside space-y-2 pl-3">
          <li><strong>Restaurants:</strong> To fulfill your orders.</li>
          <li><strong>Couriers:</strong> To deliver food safely.</li>
          <li><strong>Service Providers:</strong> Payments, analytics, support.</li>
          <li>We never sell or rent your personal information to third parties.</li>
        </ul>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
        </div>
        <p>
          We use encryption, access controls, and secure storage to protect your personal information.
          No online system is 100% secure, so keep your credentials confidential.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">6. Your Rights</h2>
        </div>
        <ul className="list-disc list-inside space-y-2 pl-3">
          <li>Access, update, or delete your account info.</li>
          <li>Request details on how your data is processed.</li>
          <li>Opt out of promotional communications.</li>
        </ul>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Cookie className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">7. Cookies</h2>
        </div>
        <p>
          We use cookies and similar technologies to enhance experience, analyze performance, and deliver personalized content. 
          You can disable cookies in your browser, but some features may not function.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
        </div>
        <p>
          We may update this Privacy Policy from time to time. Updates will be reflected here. Continued use indicates acceptance.
        </p>
      </section>

      <section className="space-y-4 bg-foreground rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">9. Contact Us</h2>
        </div>
        <p>
          Questions or concerns? Contact us at:
        </p>
        <p className="text-primary font-medium">privacy@order.jo</p>
      </section>

      <div className="border-t border-mute pt-8 text-center text-sm text-secondary/70">
        <p>
          © {new Date().getFullYear()} Order.JO — Your data, your control.
        </p>
      </div>
    </section>
  )
}
