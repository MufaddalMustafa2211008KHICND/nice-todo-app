/* eslint-disable no-alert */

import { sendPasswordResetEmail } from 'firebase/auth'
import { database } from '../PasswordLoginWithFirebase/FirebaseConfig'
import { useState } from 'react'

function ForgetPassword() {
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const emailVal = e.target.email.value
    console.log('e.target.value: ', emailVal)
    sendPasswordResetEmail(database, emailVal)
      .then(() => {
        alert('check your gmail')
        // navigate("/login")
      })
      .catch((err) => {
        alert(err.code)
      })
  }
  return (
    <>
      <h1>Forget Password</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" name="email" /> <br />
        <br />
        <button type="submit">Reset</button>
      </form>
    </>
  )
}

export default ForgetPassword
