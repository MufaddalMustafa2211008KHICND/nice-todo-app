import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'


import { database } from '../PasswordLoginWithFirebase/FirebaseConfig'

function ResetPassword() {
  const { search } = useLocation()
  const navigate = useNavigate()

  const params = new URLSearchParams(search)

  // Get the action to complete.
  const mode = params.get('mode')
  // Get the one-time code from the query parameter.
  const actionCode = params.get('oobCode') as string
  // (Optional) Get the continue URL from the query parameter if available.
  const continueUrl = params.get('continueUrl')
  // (Optional) Get the language code if available.
  const lang = params.get('lang') || 'en'

  const handleReset = (e: any) => {
    e.preventDefault()
    // verify password reset
    verifyPasswordResetCode(database, actionCode)
      .then((email) => {
        confirmPasswordReset(database, actionCode, e.target.newPassword).then(
          (resp) => {
            alert('Password reset successful')
            navigate("/login")
          }
        ).catch((err)=> {console.log(err)})
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }
  return (
    <>
      <h1>ResetPassword</h1>
      <form onSubmit={handleReset}>
        <Input type="text" name="newPassword" />
        <Button type="submit">Reset</Button>
      </form>
    </>
  )
}

export default ResetPassword
