import { toast } from 'sonner'

//  need to function for each page   1-verify input 2-validateinputs

// fullname //email //password //passwordConfirm
const fullnameVerify = (errors = {}, values) => {
  if (!values.fullname) {
    errors.fullname = toast.error('Please enter your name')
  }

  if (values.fullname.trim == '') {
    errors.fullname = toast.error("Full name shouldn't be empty")
  }

  if (values.fullname.split(' ').length < 2) {
    errors.fullname = toast.error('Please enter both your first and last name')
  }

  return errors
}

const fullnameValidate = values => {
  const errors = fullnameVerify({}, values)

  return errors
}

// email

const emailVerify = (errors = {}, values) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!values.email)
    errors.email = toast.error('Please enter your Email address')

  if (values.email.trim == '')
    errors.email = toast.error("Email shouldn't be empty")
  if (!emailRegex.test(values.email))
    errors.email = toast.error('Invalid email address')

  return errors
}

 export const emailValidate = values => {
  const errors = emailVerify({}, values)

  return errors
}

// password

const passwordVerify = (errors = {}, values) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

  if (!values.password)
    errors.email = toast.error('Please enter your Email address')
  if (values.password.trim == '')
    errors.password = toast.error("Password shouldn't be empty")

  if (!passwordRegex.test(values.password))
    errors.password = toast.error(
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
    )

  return errors
}

const passwordConfirmVerify = (errors = {}, values) => {
  if (values.password !== values.passwordConfirm)
    errors.passwordConfirm = toast.error('Passwords do not match')
}

const passwordValidate = values => {
  const errors = passwordVerify({}, values)

  return errors
}

export const signupValidate = values => {
  let errors = {}

  errors = fullnameValidate(values)
  errors = emailValidate(values)
  errors = passwordValidate(values)

  //   test
  errors = passwordConfirmVerify({}, values)

  return errors
}

export const loginValidate = values => {
  let errors = {}

  errors = emailValidate(values)
  errors = passwordValidate(values)

  return errors
}

