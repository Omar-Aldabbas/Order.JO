import { toast } from 'sonner'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { emailValidate } from '../helper/validate'
import { useAuthStore } from '../store/authStore'

export const Forgot = () => {
  const navigate = useNavigate()
  const { forgotPassword, loading, error } = useAuthStore()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: emailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      const toastId = toast.loading('Sending reset code...')
      try {
        await forgotPassword(values.email)
        toast.success('Reset code sent!', { id: toastId })
        navigate('/verify')
      } catch {
        toast.error(error || 'Failed to send reset code', { id: toastId })
      }
    },
  })

  return (
    <div className=" min-h-screen flex justify-center itmes-center flex-col min-w-screen overflow-hidden ">
      <div className="flex flex-col justify-center items-center overflow-hidden bg-secondary xl:flex-row">
        <div className=" text-foreground text-center flex flex-col items-center justify-center w-full min-h-[30vh] xl:min-h-screen xl:min-w-[30vw]">
          <h2 className="capitalize font-semibold text-2xl tracking-widest">
            forgot password
          </h2>
          <p className="text-foreground/60 mt-4 text-sm">
            Please provide us your email
          </p>
        </div>
        <div className="bg-background w-full min-h-[70vh] xl:min-h-screen flex flex-col xl:justify-center items-center xl:min-w-[50vw] rounded-4xl px-4 py-8">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-4 lg:max-w-[50vw] xl:max-w-[25vw] w-full p-1"
          >
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

            <button
              type="submit"
              disabled={loading}
              className="uppercase w-full lg:max-w-[50vw] bg-primary  text-foreground p-4 text-center rounded-lg hover:bg-secondary active:bg-secondary active:outline-primary active:outline-2 transition-colors duration-400 "
            >
              {loading ? 'Sending...' : 'send code'}
            </button>
          </form>
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <span className="text-sm text-gray-600 text-center mt-1">
              Go to{' '}
              <Link
                to="/login"
                className="text-secondary hover:text-primary active:text-primary uppercase"
              >
                log in
              </Link>{' '}
              or{' '}
              <Link
                to="/register"
                className="text-secondary hover:text-primary active:text-primary uppercase"
              >
                sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
