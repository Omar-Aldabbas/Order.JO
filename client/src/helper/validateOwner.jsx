export const ownerStep1Verify = (values) => {
  const errors = {}

  if (!values.ownerName || values.ownerName.trim() === '') {
    errors.ownerName = 'Owner name is required'
  }

  if (!values.restaurantName || values.restaurantName.trim() === '') {
    errors.restaurantName = 'Restaurant name is required'
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

  if (!values.address || values.address.trim() === '') {
    errors.address = 'Address is required'
  }

  return errors
}

export const ownerStep2Verify = (values) => {
  const errors = {}

  if (!values.tradeLicense) errors.tradeLicense = 'Trade license is required'
  if (!values.idUpload) errors.idUpload = 'ID upload is required'

  return errors
}

export const ownerStep3Verify = (values) => {
  const errors = {}

  if (values.legalClearance !== true) errors.legalClearance = 'You must confirm your legal clearance'
  if (values.terms !== true) errors.terms = 'You must agree to the terms and conditions'

  return errors
}

export const ownerValidate = (values, step) => {
  let errors = {}

  if (step >= 1) errors = { ...errors, ...ownerStep1Verify(values) }
  if (step >= 2) errors = { ...errors, ...ownerStep2Verify(values) }
  if (step >= 3) errors = { ...errors, ...ownerStep3Verify(values) }

  return errors
}

export const ownerValidateAll = (values) => {
  return {
    ...ownerStep1Verify(values),
    ...ownerStep2Verify(values),
    ...ownerStep3Verify(values),
  }
}
