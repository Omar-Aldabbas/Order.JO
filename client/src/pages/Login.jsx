import { toast } from 'sonner'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaApple, FaFacebookF, FaTwitter } from 'react-icons/fa'
import { Eye, EyeOff, TwitterIcon, XIcon } from 'lucide-react'
import { loginValidate } from '../helper/validate'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  // this register
  const formik = useFormik({
    initialValues: {
      email: 'omar@test.com',
      password: 'QWEr123$',
      remember: false,
    },
    validate: loginValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)

      if (values.remember) {
        localStorage.setItem('rememberEmail', values.email)
      } else {
        localStorage.removeItem('rememberEmail')
      }
    },
  })

  const togglePassword = e => {
    e.preventDefault()
    setShowPassword(prev => !prev)
  }

  return (
    <div className="container min-h-screen flex justify-center itmes-center flex-col min-w-screen">
      <div className="flex flex-col justify-center items-center overflow-hidden bg-secondary  xl:flex-row">
        {/* TOP */}
        <div className=" text-foreground text-center flex flex-col items-center justify-center  min-h-[30vh] xl:min-h-screen xl:min-w-[30vw]">
          <h2 className="capitalize font-semibold text-2xl tracking-widest">
            log in{' '}
          </h2>
          <p className="text-foreground/60 mt-4 text-sm">
            Please sign in to your existing account
          </p>
        </div>
        {/* BOTTOM */}
        <div className="bg-background w-full min-h-[70vh] xl:min-h-screen flex flex-col justify-center items-center  xl:min-w-[50vw] rounded-4xl p-4">
          <form
            action={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-4 w-full lg:min-w-[40vw] p-1"
          >
            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="email"
                className="uppercase text-secoundary text-sm w-full font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                name="email"
                id="email"
                {...formik.getFieldProps('email')}
                className="py-3 px-2 leading-loose rounded-lg  bg-mute focus:outline-secondary placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 w-full relative">
              <label
                htmlFor="password"
                className="uppercase text-secoundary text-sm w-full font-semibold"
              >
                password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                id="password"
                {...formik.getFieldProps('password')}
                className="py-3 px-2 leading-loose rounded-lg  bg-mute focus:outline-secondary placeholder-gray-400"
              />
              <button
                className="absolute bottom-4 right-3"
                onClick={togglePassword}
                type="button"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <div className="flex flex-row justify-between items-center w-full p-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  {...formik.getFieldProps('remember')}
                  className="w-4 h-4 accent-primary rounded-lg"
                />
                <label
                  htmlFor="remember"
                  className="text-xs text-secondary hover:text-primary active:text-primary capitalize"
                >
                  Remember Me
                </label>
              </div>

              <Link
                to="/forgot"
                className="text-xs text-secondary hover:text-primary active:text-primary capitalize"
              >
                Forgot Password?
              </Link>
            </div>
            {/* button */}
            <button
              type="submit"
              className="uppercase w-full lg:max-w-[50vw] bg-primary  text-foreground p-4 text-center rounded-lg hover:bg-secondary active:bg-secondary active:outline-primary active:outline-2 transition-colors duration-400"
            >
              log in 
            </button>
          </form>
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <span className="text-sm text-gray-600 text-center mt-1">
              Don't have an account? {'   '}{' '}
              <Link
                to="/register"
                className="text-secondary hover:text-primary active:text-primary uppercase"
              >
                sign up
              </Link>
            </span>

            <span className="text-sm text-gray-600 text-center my-2">Or</span>

            <div className="flex justify-center items-center gap-6">
              <FaApple
                size={70}
                onClick={() => toast("Oauth not implemented yet. Maybe later 😘👍")}
                className="p-6 text-white rounded-full bg-black hover:bg-primary active:bg-primary transition-colors duration-300 cursor-pointer"
              />
              <FaFacebookF
                size={70}
                onClick={() => toast("Oauth not implemented yet. Maybe later 😘👍")}
                className="p-6 text-white rounded-full bg-[#1877F2] hover:bg-primary active:bg-primary transition-colors duration-300 cursor-pointer"
              />
              <TwitterIcon
                size={70}
                onClick={() => toast("Oauth not implemented yet. Maybe later 😘👍")}
                className="p-6 text-white rounded-full bg-[#569fff] hover:bg-primary active:bg-primary transition-colors duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
