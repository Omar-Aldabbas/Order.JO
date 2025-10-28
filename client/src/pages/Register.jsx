import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { signupValidate } from '../helper/validate'
import { useAuthStore } from '../store/authStore'
import { toast } from 'sonner'
import { useAutoRedirectIfAuth } from '../utils/redirectByRole'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const navigate = useNavigate()
  const { register, loading, error } = useAuthStore()

  useAutoRedirectIfAuth(navigate)

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: signupValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      const payload = {
        name: values.fullname,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirm,
      }

      const toastId = toast.loading('Registering...')
      try {
        await register(payload)
        toast.success('Registration successful!', { id: toastId })
        navigate('/home')
      } catch {
        toast.error(Response.message || 'Check your provided information', { id: toastId })
      }
    },
  })

  const togglePassword = e => {
    e.preventDefault()
    setShowPassword(prev => !prev)
  }

  const togglePasswordConfirm = e => {
    e.preventDefault()
    setShowPasswordConfirm(prev => !prev)
  }

  return (
    <div className="container min-h-screen flex justify-center itmes-center flex-col min-w-screen">
      <div className="flex flex-col justify-center items-center overflow-hidden bg-secondary xl:flex-row">
        <div className=" text-foreground text-center flex flex-col items-center justify-center  min-h-[30vh] xl:min-w-[30vw]">
          <h2 className="capitalize font-semibold text-2xl tracking-widest">
            sign up
          </h2>
          <p className="text-foreground/60 mt-4 text-sm">
            Please sign up to get started
          </p>
        </div>
        <div className="bg-background w-full min-h-[70vh] xl:min-h-screen flex flex-col justify-center items-center xl:min-w-[50vw] rounded-4xl p-4">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-4 lg:max-w-[25vw] w-full p-1"
          >
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="fullname"
                className="uppercase text-secoundary text-sm w-full font-semibold"
              >
                name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                name="fullname"
                id="fullname"
                {...formik.getFieldProps('fullname')}
                className="py-3 px-2 leading-loose rounded-lg  bg-mute focus:outline-secondary placeholder-gray-400"
              />
            </div>

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

            <div className="flex flex-col gap-2 w-full relative">
              <label
                htmlFor="passwordConfirm"
                className="uppercase text-secoundary text-sm w-full font-semibold"
              >
                re-type password
              </label>
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder="Enter your passwordConfirm"
                name="passwordConfirm"
                id="passwordConfirm"
                {...formik.getFieldProps('passwordConfirm')}
                className="py-3 px-2 leading-loose rounded-lg  bg-mute focus:outline-secondary placeholder-gray-400"
              />
              <button
                className="absolute bottom-4 right-3"
                onClick={togglePasswordConfirm}
                type="button"
              >
                {showPasswordConfirm ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="uppercase w-full lg:max-w-[50vw] bg-primary  text-foreground p-4 text-center rounded-lg hover:bg-secondary active:bg-secondary active:outline-primary active:outline-2 transition-colors duration-400"
            >
              {loading ? 'Loading...' : 'sign up'}
            </button>
          </form>
          <span className="text-sm text-gray-600 text-center mt-1">
            Already registered?{' '}
            <Link
              to="/login"
              className="text-secondary hover:text-primary active:text-primary uppercase"
            >
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
