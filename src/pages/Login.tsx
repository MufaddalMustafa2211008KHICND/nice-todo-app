import { useState } from 'react'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Label from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authing, setAuthing] = useState(false)
  const [error, setError] = useState('')

  const [signupMail, setSignupMail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [signupError, setSignupError] = useState('')
  const [signupAuthing, setSignupAuthing] = useState(false)

  // Initialize Firebase authentication and navigation
  const auth = getAuth()
  const navigate = useNavigate()

  // Function to handle sign in with google
  const signInWithGoogle = async () => {
    setAuthing(true)

    // use Firebase to sign in with google

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setAuthing(false)
      })
  }

  // Funtion to handle sign in with email and password
  const signInWithEmail = async () => {
    setAuthing(true)
    setError('')

    // use Firebase to sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
        setAuthing(false)
      })
  }

  // Function to handle sign-up with Google
  const signUpWithGoogle = () => {
    setSignupAuthing(true)

    // use firebase to signup with google
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setSignupAuthing(false)
      })
  }

  const signUpWithEmail = async () => {
    // check if password match
    if (signupPassword !== confirmPassword) {
      setSignupError('Password do not match')
      return
    }

    setSignupAuthing(true)
    setSignupError('')

    // use Firebase to create a new user with email and password
    createUserWithEmailAndPassword(auth, signupMail, signupPassword)
      .then((response) => {
        console.log(response.user.uid)
        // navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setSignupError(err.message)
        setSignupAuthing(false)
      })
  }

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Add credentials to login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={signInWithEmail}>Sign in with Email</Button>
            <Link to="/forgetPassword">Forget Password</Link>
            {/* Display error message if there is one */}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Button onClick={signInWithGoogle} disabled={authing}>
              {' '}
              Sign in wih Google
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={signupMail}
                onChange={(e) => setSignupMail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={signUpWithGoogle}>Sign up with Google</Button>
            {/* Display error message if there is one */}
            {signupError && <div className="text-red-500 mb-4">{error}</div>}
            <Button onClick={signUpWithEmail} disabled={signupAuthing}>
              Sign up with Email
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default Login
