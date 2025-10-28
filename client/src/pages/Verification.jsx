import { toast } from 'sonner'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { emailValidate } from '../helper/validate'

export const Verification = () => {
  // this register
  const formik = useFormik({
    initialValues: {
      num1: '',
      num2: '',
      num3: '',
      num4: '',
    },
    validate: '',
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      const otp = values.num1 + values.num2 + values.num3 + values.num4
      console.log(otp)
    },
  })

  return (
    <div className="container min-h-screen bg-secondary flex justify-center itmes-center flex-col ">
      <div className="flex flex-col justify-center items-center overflow-hidden xl:flex-row relative bg-secondary">
        {/* TOP */}
        <div className=" text-foreground text-center flex flex-col items-center justify-center  min-h-[30vh] xl:min-h-screen xl:min-w-[30vw]">
          <h2 className="capitalize font-semibold text-2xl tracking-widest">
            Verification password{' '}
          </h2>
          <p className="text-foreground/60 mt-4 text-sm">
            We have sent a code to your email
          </p>
        </div>
        {/* BOTTOM */}
        <div className="bg-background w-full min-h-[70vh] xl:min-h-screen flex flex-col lg:justify-center items-center xl:min-w-[50vw] rounded-4xl px-4 py-8">
          <form
            action={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-4 lg:max-w-[40vw] xl:max-w-[25vw] w-full p-1"
          >
            {/* CODE */}
            <div className="flex gap-2">
              {['num1', 'num2', 'num3', 'num4'].map((name, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  {...formik.getFieldProps(name)}
                  className="w-16 h-16 text-center py-4 px-4 leading-loose rounded-lg  bg-mute focus:outline-secondary placeholder-gray-400"
                />
              ))}
            </div>

            {/* button */}
            <button
              type="submit"
              className="uppercase w-full lg:max-w-[50vw] bg-primary  text-foreground p-4 text-center rounded-lg hover:bg-secondary active:bg-secondary active:outline-primary active:outline-2 transition-colors duration-400 "
            >
              verify
            </button>
          </form>
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <span className="text-sm text-gray-600 text-center mt-1">
              {'  '}
              Go back to
              {'  '}
              <Link
                to="/login"
                className="text-secondary hover:text-primary active:text-primary uppercase"
              >
                log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
