export const driverStep1Verify = (values) => {
  const errors = {}

  if (!values.fullname || values.fullname.trim() === '') {
    errors.fullname = 'Full name is required'
  } else if (values.fullname.split(' ').length < 2) {
    errors.fullname = 'Please enter both first and last name'
  }

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.phone || values.phone.trim() === '') {
    errors.phone = 'Phone number is required'
  } else if (!/^\+?\d{7,15}$/.test(values.phone)) {
    errors.phone = 'Invalid phone number format'
  }

  if (!values.age || values.age === '') {
    errors.age = 'Age is required'
  } else if (isNaN(values.age) || values.age < 18) {
    errors.age = 'You must be at least 18 years old'
  }

  return errors
}

export const driverStep2Verify = (values) => {
  const errors = {}

  if (!values.driverLicense) errors.driverLicense = 'Driver license is required'
  if (!values.carLicense) errors.carLicense = 'Car license is required'
  if (!values.idUpload) errors.idUpload = 'ID upload is required'

  return errors
}

export const driverStep3Verify = (values) => {
  const errors = {}

  if (values.legalClearance !== true) errors.legalClearance = 'You must confirm your legal clearance'
  if (values.terms !== true) errors.terms = 'You must agree to the terms and conditions'

  return errors
}

export const driverValidate = (values, step) => {
  let errors = {}

  if (step >= 1) errors = { ...errors, ...driverStep1Verify(values) }
  if (step >= 2) errors = { ...errors, ...driverStep2Verify(values) }
  if (step >= 3) errors = { ...errors, ...driverStep3Verify(values) }

  return errors
}

export const driverValidateAll = (values) => {
  return {
    ...driverStep1Verify(values),
    ...driverStep2Verify(values),
    ...driverStep3Verify(values),
  }
}


