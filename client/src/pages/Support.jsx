import { cn } from '../utils/cn'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Mail, MessageSquare, Send, Info } from 'lucide-react'
import * as Yup from 'yup'
import { toast } from 'sonner'
import { useEffect } from 'react'

const HelpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().min(10, 'Message too short').required('Required'),
})

export const HelpPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Your message has been sent!')
      resetForm()
    } catch (err) {
      toast.error('Failed to send message, please try again later')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        'max-w-5xl mx-auto px-6 py-16 space-y-12',
        'text-secondary animate-fade-in-left'
      )}
    >
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary">
          Need Help? We're Here
        </h1>
        <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
          Have a question or issue? Fill out the form below and our support team
          will get back to you promptly.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-center">
        <div className="flex flex-col items-start gap-3 bg-foreground rounded-xl p-6 shadow-sm flex-1">
          <Info className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold text-secondary">
            How We Can Help
          </h2>
          <p className="text-secondary/80">
            Whether it’s an issue with an order, a question about our platform,
            or general feedback, we’re here to help.
          </p>
          <ul className="list-disc list-inside space-y-2 text-secondary/70 mt-2">
            <li>Order problems or discrepancies</li>
            <li>Account or profile assistance</li>
            <li>Feature requests and suggestions</li>
            <li>General inquiries about our services</li>
          </ul>
        </div>

        <div className="flex-1 bg-foreground rounded-xl p-6 shadow-sm ">
          <h2 className="text-2xl font-semibold text-secondary flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" /> Contact Support
          </h2>

          <Formik
            initialValues={{ email: '', message: '' }}
            validationSchema={HelpSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <label className="flex flex-col text-secondary/80 text-sm font-medium">
                  Your Email
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="mt-2 px-4 py-2 rounded-xl border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </label>

                <label className="flex flex-col text-secondary/80 text-sm font-medium">
                  Your Message
                  <Field
                    as="textarea"
                    name="message"
                    rows={6}
                    placeholder="Write your message here..."
                    className="mt-2 px-4 py-2 rounded-xl border border-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-primary text-foreground font-semibold px-6 py-3 rounded-xl hover:bg-order transition-all duration-300"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}
