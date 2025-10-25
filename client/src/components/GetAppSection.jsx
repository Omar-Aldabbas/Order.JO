import { useEffect, useState } from 'react'
import FriendsOrg from '../assets/images/friendsorg.png'
import Friends from '../assets/images/friends.png'
import { cn } from '../utils/cn'
import { toast } from 'sonner'
import Android from '../assets/images/android.png'
import Apple from '../assets/images/apple.png'

export const GetAppSection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="py-5 flex w-full my-4">
      <div className="bg-mute flex flex-col-reverse lg:grid lg:grid-cols-2 w-full gap-3 relative rounded-xl">
        <div className="relative w-full">
          <img
            src={FriendsOrg}
            alt="Freinds using our app "
            className="relative z-20"
          />
          <img
            src={Friends}
            alt="Shadow img"
            className="absolute -top-5 -left-5 z-10 "
          />
        </div>

        <div className="flex flex-col justify-center items-center p-3 gap-4 text-center">
          <h2
            className={cn(
              'font-bold flex flex-row justify-center items-center',
              isMobile ? 'text-3xl' : 'text-6xl'
            )}
          >
            <span className="font-bold tracking-tighter relative">
              Order{' '}
              <span className={cn("tracking-tight -rotate-90 inline-block bg-primary -left-1 px-1 relative -top-2",  isMobile ? 'text-sm ': 'text-3xl')}>
                .jo
              </span>
            </span>
            ing is more
          </h2>

          <h4
            className={cn(
              'font-semibold text-foreground',
              isMobile ? 'text-2xl text-secondary' : 'text-4xl bg-secondary px-18 py-4 rounded-full '
            )}
          >
            <span className={cn("underline text-primary")}>Personalized</span> &
            Instant
          </h4>

          <p className={cn(isMobile ? 'text-sm' : 'text-base')}>
            Download the order.jo app for better experience
          </p>

          <div className="grid grid-cols-2 gap-2 justify-center items-center p-5">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                toast.info('There is no Android application yet')
              }}
            >
              <img src={Android} alt="Googleplay link" className={cn(isMobile ? 'w-32' : 'w-64 p-1')} />
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                toast.info('There is no Apple store application yet')
              }}
            >
              <img src={Apple} alt="Apple store link" className={cn(isMobile ? 'w-32' : 'w-64')} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
