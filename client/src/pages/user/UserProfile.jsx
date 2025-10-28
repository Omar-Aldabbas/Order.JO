import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useAuthStore } from '../../store/authStore'
import { getProfile, updateProfile } from '../../api/user'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { User2, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const profileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  address: Yup.string().required('Address is required'),
  birth_date: Yup.date().required('Birth date is required'),
  avatar: Yup.mixed()
    .nullable()
    .test('fileType', 'The avatar field must be an image.', value => {
      if (!value) return true
      return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
        value.type
      )
    }),
})

export const UserProfile = () => {
  const { user, logout } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [backendUser, setBackendUser] = useState(null)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      birth_date: '',
      avatar: null,
      role: 'user',
    },
    validationSchema: profileSchema,
    onSubmit: async values => {
      setLoading(true)
      const toastId = toast.loading('Updating profile...')
      try {
        const payload = new FormData()
        Object.entries(values).forEach(([key, value]) => {
          if (value !== null) payload.append(key, value)
        })
        const updatedUser = await updateProfile(payload)
        setBackendUser(updatedUser.user)
        toast.success('Profile updated successfully!', { id: toastId })
      } catch (err) {
        toast.error(err.message || 'Failed to update profile', { id: toastId })
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    const fetchProfile = async () => {
      setInitialLoading(true)
      try {
        const res = await getProfile()
        setBackendUser(res.user)
        formik.setValues({
          name: res.user.name || '',
          email: res.user.email || '',
          phone: res.user.phone || '',
          address: res.user.address || '',
          birth_date: res.user.birth_date || '',
          avatar: null,
          role: res.user.role || 'user',
        })
      } catch (err) {
        toast.error(err.message || 'Failed to load profile')
      } finally {
        setInitialLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    )
  }

  const avatarUrl = formik.values.avatar
    ? URL.createObjectURL(formik.values.avatar)
    : backendUser?.avatar
      ? `http://localhost:8000/storage/${backendUser.avatar}`
      : null

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background rounded-2xl shadow-xl min-h-[70vh] space-y-6 my-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-secondary">My Profile</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-foreground font-semibold rounded-lg hover:bg-secondary transition-all duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <label
            htmlFor="avatar"
            className="cursor-pointer w-28 h-28 rounded-full border-4 border-red-600 overflow-hidden flex justify-center items-center"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User2 size={48} className="text-primary" />
            )}
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={e =>
              formik.setFieldValue('avatar', e.currentTarget.files[0])
            }
            className="hidden"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-secondary">Name</label>
            <input
              type="text"
              name="name"
              {...formik.getFieldProps('name')}
              className="px-4 py-3 rounded-lg border border-muted focus:outline-red-600"
            />
            {formik.errors.name && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-secondary">Phone</label>
            <input
              type="text"
              name="phone"
              {...formik.getFieldProps('phone')}
              className="px-4 py-3 rounded-lg border border-muted focus:outline-red-600"
            />
            {formik.errors.phone && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-secondary">Email</label>
          <input
            type="email"
            name="email"
            {...formik.getFieldProps('email')}
            disabled
            className="px-4 py-3 rounded-lg border border-muted bg-mute cursor-not-allowed"
          />
          <p className="text-sm text-secondary mt-1">
            Email cannot be changed.
          </p>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-secondary">Address</label>
          <textarea
            name="address"
            {...formik.getFieldProps('address')}
            className="px-4 py-3 rounded-lg border border-muted focus:outline-red-600 resize-none"
          />
          {formik.errors.address && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.address}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-secondary">Birth Date</label>
            <input
              type="date"
              name="birth_date"
              {...formik.getFieldProps('birth_date')}
              className="px-4 py-3 rounded-lg border border-muted focus:outline-red-600"
            />
            {formik.errors.birth_date && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.birth_date}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-secondary">Role</label>
            <input
              type="text"
              name="role"
              value={formik.values.role}
              disabled
              className="px-4 py-3 rounded-lg border border-muted bg-mute cursor-not-allowed"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-primary text-foreground font-semibold rounded-lg hover:bg-secondary transition-all duration-200"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}
