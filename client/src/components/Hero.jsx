import { Formik, useFormik } from 'formik'
import Woman1 from '../assets/images/woman1.png'
import Woman2 from '../assets/images/woman2.png'

export const Hero = () => {
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validate: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    },
  })
  return (
    <div className="p-10 relative w-full bg-secondary md:min-h-[80vh] border-2 border-mute rounded-lg flex flex-col  lg:flex-row justify-between items-center md:bg-[#fbfbfb] overflow-hidden">
      {/* Text div */}
      <div className="z-20 flex flex-col justify-center items-center">
        <div>
          <p className='text-foreground text-center md:text-left md:text-secondary'>Order Restaurent food, takeaway and groceries.</p>
          <h1 className="text-[3.3rem] text-foreground md:text-secondary capitalize font-semibold leading-tight">
            feast your senses, <br />
            <span className="text-primary ">Fast and fresh</span>
          </h1>
        </div>

        <div className="md:text-secondary/70 text-foreground  flex flex-col justify-center gap-4 mt-4">
          <p>Search for what you need and see waht we deliver</p>
          <div>
            <form
              action=""
              className="relative mt-5 flex flex-row justify-center items-center"
            >
              <input
                type="text"
                placeholder="e.g Pizza, Shawerma"
                name="search"
                {...formik.getFieldProps('search')}
                className="border-mute  outline-primary border-2 px-5 py-3 min-w-full rounded-full placeholder:text-gray-500 bg-[#fbfbfb] md:bg-transparent"
              />
              <button className="absolute right-0 bg-primary text-foreground rounded-full px-5 md:px-12 py-3 hover:bg-secondary hover:shadow-inner active:bg-secondary transition-colors duration-400">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* noti div */}
      <div className="absolute 2-10">{/* no time for this now  */}</div>
      {/* bg img div */}
      <div className="absolute z-10 w-full min-h-screen  hidden md:flex ">
        <span className="absolute z-10 inset-0 bg-primary rounded-tl-[70%] top-32 left-[53%]"></span>
        <img
          src={Woman1}
          alt="Random woman eating"
          className="absolute bottom-20 left-[53%] z-10"
        />
        <img
          src={Woman2}
          alt="Random woman eating"
          className="absolute bottom-20 left-1/6 z-10"
        />
      </div>
    </div>
  )
}
