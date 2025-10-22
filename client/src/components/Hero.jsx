import Woman1 from "../assets/images/woman1.png"
import Woman2 from "../assets/images/woman2.png"

export const Hero = () => {
  return (
    <div className="relative w-full min-h-[80vh] border-2 border-mute rounded-lg flex flex-col  lg:flex-row justify-between items-center bg-[#fbfbfb] overflow-hidden">
      {/* Text div */}
      <div className=" z-20">
        <p>Order Restaurent food,takeaway and groceries.</p>
        <h1 classname="text-[3.3rem] text-secondary capitalize">feast your senses, <br/>
            <span classname="text-primary ">Fast and fresh</span>
        </h1>
      </div>
      {/* noti div */}
      <div className="absolute 2-10"></div>
      {/* bg img div */}
      <div className="absolute z-10 w-full min-h-screen">
        <span className="absolute z-10 inset-0 bg-primary rounded-tl-[70%] top-32 left-[53%]"></span>
        <img src={Woman1} alt="Random woman eating" className="absolute bottom-20 left-[53%] z-10" />
        <img src={Woman2} alt="Random woman eating" className="absolute bottom-20 left-1/6 z-10" />
      </div>
    </div>
  )
}
