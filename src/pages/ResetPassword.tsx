import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { database } from '../PasswordLoginWithFirebase/FirebaseConfig'

function ResetPassword() {
  const { search } = useLocation()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const params = new URLSearchParams(search)

  // Get the action to complete.
  // const mode = params.get('mode')
  const actionCode = params.get('oobCode') as string
  // const continueUrl = params.get('continueUrl')

  const handleReset = (e: any) => {
    e.preventDefault()
    // verify password reset
    setLoading(true)
    verifyPasswordResetCode(database, actionCode)
      .then(() => {
        confirmPasswordReset(database, actionCode, e.target.newPassword.value)
          .then(() => {
            setLoading(false)
            // eslint-disable-next-line no-alert
            alert('Password reset successful')
            navigate('/login')
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => setLoading(false))
      })
      .catch((err) => {
        console.log('error:', err)
        setLoading(false)
      })
  }
  return (
    <>
      <h1>ResetPassword</h1>
      <form onSubmit={handleReset}>
        <Input type="text" name="newPassword" />
        <Button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset'}
        </Button>
      </form>
    </>
  )
}

export default ResetPassword
