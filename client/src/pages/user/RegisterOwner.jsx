import { useState } from 'react'
import { useFormik } from 'formik'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { ownerValidate } from '../../helper/validateOwner'

export const RegisterOwner = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      restaurantName: '',
      email: '',
      phone: '',
      address: '',
      tradeLicense: null,
      idUpload: null,
      legalClearance: false,
      terms: false,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: values => ownerValidate(values, step),
    onSubmit: values => {
      const errors = ownerValidate(values, 2)
      if (Object.keys(errors).length === 0) {
        toast.success('Restaurant owner registration submitted successfully!')
        console.log(values)
      } else {
        Object.values(errors).forEach(err => toast.error(err))
      }
    },
  })

  const nextStep = async () => {
    const errors = await formik.validateForm()
    if (Object.keys(errors).length === 0) setStep(step + 1)
    else Object.values(errors).forEach(err => toast.error(err))
  }

  const prevStep = () => setStep(step - 1)
  const goBack = () => navigate(-1)

  return (
    <div className="container min-h-screen flex justify-center items-center flex-col min-w-screen">
      <div className="flex flex-col justify-center items-center overflow-hidden bg-secondary xl:flex-row w-full">
        <div className="text-foreground text-center flex flex-col items-center justify-center min-h-[30vh] xl:min-w-[30vw]">
          <h2 className="capitalize font-semibold text-2xl tracking-widest">
            {step === 1 && 'Register as Restaurant Owner'}
            {step === 2 && 'Upload Documents & Confirm'}
          </h2>
          <p className="text-foreground/60 mt-4 text-sm">
            Step {step} of 2 — complete your registration
          </p>

          <button
            onClick={goBack}
            className=" mt-4 bg-order px-6 py-3 rounded-full hover:bg-primary"
          >
            Back
          </button>
        </div>

        <div className="bg-background w-full min-h-[70vh] xl:min-h-screen flex flex-col justify-center items-center xl:min-w-[50vw] rounded-4xl p-6">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-4 lg:max-w-[25vw] w-full p-2"
          >
            {step === 1 && (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <label className="uppercase text-sm font-semibold">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps('ownerName')}
                    placeholder="John Doe"
                    className="py-3 px-2 rounded-lg bg-mute focus:outline-order w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="uppercase text-sm font-semibold">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps('restaurantName')}
                    placeholder="My Restaurant"
                    className="py-3 px-2 rounded-lg bg-mute focus:outline-order w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="uppercase text-sm font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    {...formik.getFieldProps('email')}
                    placeholder="example@email.com"
                    className="py-3 px-2 rounded-lg bg-mute focus:outline-order w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="uppercase text-sm font-semibold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...formik.getFieldProps('phone')}
                    placeholder="+962-..."
                    className="py-3 px-2 rounded-lg bg-mute focus:outline-order w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="uppercase text-sm font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps('address')}
                    placeholder="123 Main St"
                    className="py-3 px-2 rounded-lg bg-mute focus:outline-order w-full"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <label className="uppercase text-sm font-semibold">
                    Trade License
                  </label>
                  <input
                    type="file"
                    onChange={e =>
                      formik.setFieldValue('tradeLicense', e.target.files[0])
                    }
                    className="py-2 px-2 bg-mute rounded-lg w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="uppercase text-sm font-semibold">
                    ID Upload
                  </label>
                  <input
                    type="file"
                    onChange={e =>
                      formik.setFieldValue('idUpload', e.target.files[0])
                    }
                    className="py-2 px-2 bg-mute rounded-lg w-full"
                  />
                </div>
                <label className="flex items-center gap-3 text-sm text-secoundary">
                  <input
                    type="checkbox"
                    {...formik.getFieldProps('legalClearance')}
                    className="accent-order w-5 h-5 rounded"
                  />
                  I confirm I have no active legal enforcement issues.
                </label>
                <label className="flex items-center gap-3 text-sm text-secoundary">
                  <input
                    type="checkbox"
                    {...formik.getFieldProps('terms')}
                    className="accent-order w-5 h-5 rounded"
                  />
                  I agree to the terms & conditions and data policy.
                </label>
              </>
            )}

            <div className="flex w-full justify-between mt-6 gap-2">
              {step < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-order px-4 py-2 rounded-lg text-white hover:bg-primary w-full"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-order px-4 py-2 rounded-lg text-white hover:bg-order/90 w-full"
                >
                  Register
                </button>
              )}
            </div>
          </form>

          <span className="text-sm text-gray-600 text-center mt-4">
            Already registered?{' '}
            <Link
              to="/login"
              className="text-order hover:text-primary uppercase"
            >
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
