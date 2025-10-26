import { Cloud, Facebook, Instagram, Linkedin } from 'lucide-react'
import { cn } from '../utils/cn'
import { toast } from 'sonner'
import Android from '../assets/images/android.png'
import Apple from '../assets/images/apple.png'
import { useEffect, useState } from 'react'
import { BsSnapchat } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FaSnapchat } from 'react-icons/fa6'

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <footer className=" bg-mute">
      <div
        className={cn("py-14 px-8 mt-4",
          isMobile
            ? 'flex flex-col justify-center'
            : 'grid grid-cols-3 justify-items-center items-baseline'
        )}
      >
        {/* logo app and location */}
        <div className="flex flex-col justify-center p-1">
          <h1 className="font-bold text-6xl tracking-tighter relative p-4">
            Order{' '}
            <span className="tracking-tight -rotate-90 inline-block bg-primary text-lg px-1 -ml-2 min-w-[32px] -top-3 relative">
              .JO
            </span>
          </h1>

          <div className="grid grid-cols-2 gap-2 justify-center items-center p-4">
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                toast.info('There is no Android application yet')
              }}
            >
              <img
                src={Android}
                alt="Googleplay link"
                className={cn(isMobile ? 'w-32' : 'w-64 p-1')}
              />
            </a>

            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                toast.info('There is no Apple store application yet')
              }}
            >
              <img
                src={Apple}
                alt="Apple store link"
                className={cn(isMobile ? 'w-32' : 'w-64')}
              />
            </a>
          </div>

          <p className="text-secondary p-4">
            Company # 490039-445, Registered with House of companies.
          </p>
        </div>

        {/* newsletter */}

        <div className="space-y-4">
          <h4 className="text-secondary font-bold text-xl">
            Get Exclusive Deals in your Inbox
          </h4>

          <form action="" className="relative">
            <input
              type="email"
              placeholder='johndoe@email.com'
              className="px-5 py-4  focus:outline-primary shadow-inner text-secondary placeholder-gray-200 bg-gray-300 rounded-full w-full"
            />
            <button className="absolute right-0 py-4 px-7 bg-primary rounded-full text-foreground font-semibold ">
              Subscribe
            </button>
          </form>
          <p className="text-secondary text-sm">
            we wont spam, read our email policy
          </p>
          <div className="flex flex-row flex-nowrap justify-center items-center gap-6 p-4">
            <Facebook
              size={50}
              onClick={e => {
                e.preventDefault
                toast.info(
                  "We're still working on this feature. Stay Tuned! 😊"
                )
              }}
              className="text-secondary hover:text-primary active:text-primary transition-colors duration-200 border rounded-xl p-2"
            />
            <Instagram
              size={50}
              onClick={e => {
                e.preventDefault
                toast.info(
                  "We're still working on this feature. Stay Tuned! 😊"
                )
              }}
              className="text-secondary hover:text-primary active:text-primary transition-colors duration-200 border rounded-xl p-2"
            />
            <Linkedin
              size={50}
              onClick={e => {
                e.preventDefault
                toast.info(
                  "We're still working on this feature. Stay Tuned! 😊"
                )
              }}
              className="text-secondary hover:text-primary active:text-primary transition-colors duration-200 border rounded-xl p-2"
            />
            <Cloud
              size={50}
              onClick={e => {
                e.preventDefault
                toast.info(
                  "We're still working on this feature. Stay Tuned! 😊"
                )
              }}
              className="text-secondary hover:text-primary active:text-primary transition-colors duration-200 border rounded-xl p-2"
            />
          </div>
        </div>
        {/* moreinfo */}

        <div
          className={cn(
            isMobile
              ? 'flex flex-col gap-2 justify-center'
              : 'grid grid-cols-2 justify-items-center'
          )}
        >
          <ul className="space-y-3 p-3">
            <li className="font-semibold text-lg">Legal Pages</li>
            <li>
              <Link to="#" className="underline  capitalize">
                terms & conditions
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="underline text-secondary hover:text-primary active:text-primary transition-colors duration-200 capitalize"
              >
                privacy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="underline text-secondary hover:text-primary active:text-primary transition-colors duration-200 capitalize"
              >
                Cookeis
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="underline text-secondary hover:text-primary active:text-primary transition-colors duration-200 capitalize"
              >
                Modern Slavery Statement
              </Link>
            </li>
          </ul>

          <ul className="space-y-3 p-3">
            <li className="font-semibold text-lg">Important Links</li>
            <li>
              <Link
                to="#"
                className="underline text-secondary hover:text-primary active:text-primary transition-colors duration-200 capitalize"
              >
                get help
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="underline text-secondary hover:text-primary active:text-primary transition-colors duration-200 capitalize"
              >
                add yout restaurant
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="underline text-secondary hover:text-primary active:text-primary transition-colors duration-200 capitalize"
              >
                sign up as driver
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={e => {
                  e.preventDefault
                  toast.info(
                    "We're still working on this feature. Stay Tuned! 😊"
                  )
                }}
                className="underline text-secondary hover:text-primary active:text-primary transition-colors duration-200 capitalize"
              >
                Awards & promotions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="font-semibold text-foreground p-3 bg-secondary text-center">
        <p>© Order.JO {new Date().getFullYear()}, All Rights Reserved.</p>
      </div>
    </footer>
  )
}
