export const FAQSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeID, setActiveID] = useState(1)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = () => setActiveID(activeID === id ? null : id)

  return (
    <div className="py-5 bg-mute flex flex-col justify-center items-center min-h-[50vh] rounded-xl">
      <div className="flex flex-col justify-center md:flex-row md:justify-between md:gap-40 items-center">
        {/* title here  */}
        <h2 className="text-secondary font-semibold text-3xl p-5">
          Know more about us
        </h2>
        <div className={cn(isMobile ? 'hidden' : 'space-x-4')}>
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

      {/* QA section */}
      <div
        className={cn(
          isMobile
            ? 'flex flex-col gap-3 justify-center items-center'
            : 'grid grid-cols-3 gap-3'
        )}
      >
        {FAQS.map((faq, i) => (
          <div></div>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { cn } from '../utils/cn'
import { FAQS } from '../data/FAQ'
import { AnswerCard } from './cards/AnswerCard'
import { Link } from 'react-router-dom'

// export const FAQSection = () => {
//   const [isMobile, setIsMobile] = useState(false)
//   const [activeId, setActiveId] = useState(1)

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 1024)
//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   const toggleQuestion = (id) => {
//     setActiveId(activeId === id ? null : id)
//   }

//   return (
//     <section className="py-10 bg-mute flex flex-col justify-center items-center gap-8">
//       <h2 className="text-3xl font-bold text-primary mb-4">
//         Frequently Asked Questions
//       </h2>

//       <div className="w-full max-w-6xl flex flex-col gap-4">
//         {FAQS.map((faq) => (
//           <div
//             key={faq.id}
//             className="bg-background rounded-xl shadow-sm overflow-hidden transition-all duration-300"
//           >
//             {/* Question header */}
//             <button
//               onClick={() => toggleQuestion(faq.id)}
//               className={cn(
//                 "w-full text-left p-5 rounded-xl font-semibold transition-all duration-300",
//                 activeId === faq.id
//                   ? "bg-primary text-foreground"
//                   : "bg-transparent text-secondary hover:bg-muted"
//               )}
//             >
//               {faq.question}
//             </button>

//             {/* Answer section */}
//             <div
//               className={cn(
//                 "grid transition-all duration-500 ease-in-out overflow-hidden",
//                 activeId === faq.id
//                   ? cn(isMobile ? "grid-cols-1 py-6 px-5" : "grid-cols-3 py-8 px-8")
//                   : "grid-rows-[0fr] p-0"
//               )}
//               style={{
//                 maxHeight: activeId === faq.id ? "1000px" : "0",
//                 opacity: activeId === faq.id ? 1 : 0,
//               }}
//             >
//               {activeId === faq.id && (
//                 <>
//                   {faq.answers.map((ans) => (
//                     <AnswerCard
//                       key={ans.id}
//                       title={ans.title}
//                       img={ans.img}
//                       alt={ans.title}
//                       text={ans.text}
//                     />
//                   ))}

//                   {faq.moreInfo && (
//                     <div className="col-span-full mt-6 p-4 bg-mute/50 rounded-lg text-foreground">
//                       {faq.moreInfo}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }
