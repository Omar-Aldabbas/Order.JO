import { useEffect, useState } from 'react'

export const GetAppSection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return (

    <div className='py-5 flex'>
        <div className='bg-mute flex-col lg:flex-row-reverse'>
            <div>
                
            </div>
        </div>
    </div>
  )
}
