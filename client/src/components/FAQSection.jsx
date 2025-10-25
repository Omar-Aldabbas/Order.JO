import { cn } from '../utils/cn'
import { FAQS } from '../data/FAQ'
import { AnswerCard } from './cards/AnswerCard'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const FAQSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeID, setActiveID] = useState(1)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="py-7 px-4 md:px-14 bg-mute flex flex-col justify-center items-center min-h-[50vh] rounded-xl gap-2 md:gap-8">
      <div className="flex flex-col justify-center md:flex-row md:justify-between md:gap-20 items-center w-full px-5 py-3">
        <h2 className="text-secondary font-bold text-3xl p-5">
          Know more about us
        </h2>

        <div className={cn(isMobile ? 'hidden' : 'space-x-4 flex')}>
          <Link
            to="#"
            onClick={e => e.preventDefault()}
            className="pointer-events-none py-3 px-6 cursor-not-allowed outline-1 outline-primary rounded-full font-semibold"
          >
            Frequent Questions
          </Link>
          <Link
            to="/help"
            className="py-3 px-6 cursor-not-allowed hover:outline-1 hover:outline-primary hover:font-semibold rounded-full"
          >
            Help & Support
          </Link>
          <Link
            to="/privacy"
            className="py-3 px-6 cursor-not-allowed hover:outline-1 hover:outline-primary hover:font-semibold rounded-full"
          >
            Privacy
          </Link>
          <Link
            to="/statement"
            className="py-3 px-6 cursor-not-allowed hover:outline-1 hover:outline-primary hover:font-semibold rounded-full"
          >
            Modern Slavery Statement
          </Link>
        </div>
      </div>

      <div
        className={cn(
          'bg-background p-12 rounded-xl',
          isMobile
            ? 'flex flex-col gap-6 w-full px-5 '
            : 'grid grid-cols-3 gap-6 w-full'
        )}
      >
        <div className="flex flex-col gap-4">
          {FAQS.map(faq => (
            <div
              key={faq.id}
              className={cn(
                'font-bold rounded-full transition duration-200 py-3 px-5 w-full cursor-pointer text-center',
                activeID === faq.id
                  ? 'bg-primary text-foreground'
                  : 'text-secondary hover:bg-primary hover:text-foreground'
              )}
              onClick={() => setActiveID(faq.id)}
            >
              {faq.question}
            </div>
          ))}
        </div>

        <div className="col-span-2 flex flex-col gap-4">
          {FAQS.filter(faq => faq.id === activeID).map(faq => (
            <div key={faq.id} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                {faq.answers.map(ans => (
                  <div className="flex-1" key={ans.id}>
                    <AnswerCard
                      title={ans.title}
                      img={ans.img}
                      alt={ans.title}
                      text={ans.text}
                    />
                  </div>
                ))}
              </div>

              {faq.moreInfo && (
                <div className="w-full p-4  rounded-xl text-center">
                  {faq.moreInfo}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
