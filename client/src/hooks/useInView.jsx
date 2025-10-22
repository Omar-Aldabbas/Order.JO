import { useEffect, useMemo, useRef, useState } from "react"


export const useInView = (options={}) => {
 const ref = useRef(null);
 consst [isVisible, setIsVisible] = useState(flase)

 const memOptions = useMemo(()=> options, [JSON.stringify(options)])
 useEffect(()=> {
    const observer = new IntersectionObserver(([entry], obs) => {
        if(entry.isIntersecting) {
            setIsVisible(prev => !prev);
            obs.unobserve(entry.target);
        }
    }, memOptions)

    if(ref.current) observer.observe(ref.current);

    return () => {if(ref.current) observer.unobserve(ref.current)}
 }, [memOptions])


 return [ref, isVisible]
}