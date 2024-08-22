import { useState } from 'react'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(50),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(50),
})

// for password validation
// z
// .string()
// .min(8)
// .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
// .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
// .regex(/\d/, 'Password must contain at least one number')
// .regex(/[\W_]/, 'Password must contain at least one special character')
// .max(50),

function Login() {
  const [authing, setAuthing] = useState(false)
  const [googleAuthing, setGoogleAuthing] = useState(false)
  const [error, setError] = useState('')

  const [signupMail, setSignupMail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [signupError, setSignupError] = useState('')
  const [signupAuthing, setSignupAuthing] = useState(false)

  const loginForm = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Initialize Firebase authentication and navigation
  const auth = getAuth()
  const navigate = useNavigate()

  // Function to handle sign in with google
  const signInWithGoogle = async () => {
    setGoogleAuthing(true)
    setError('')

    // use Firebase to sign in with google

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
        setGoogleAuthing(false)
      })
  }

  // Funtion to handle sign in with email and password
  const signInWithEmail = (data: z.infer<typeof LoginSchema>) => {
    setAuthing(true)
    setError('')

    // use Firebase to sign in with email and password
    signInWithEmailAndPassword(auth, data.email, data.password)
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
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(signInWithEmail)}>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Add credentials to login</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="xyz@gmail.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex flex-col gap-y-4 items-center">
                  <Button type="submit" className="w-full" disabled={authing}>
                    Sign in
                  </Button>
                  or
                  <Button
                    onClick={signInWithGoogle}
                    disabled={googleAuthing}
                    className="w-full"
                  >
                    Sign in wih Google
                  </Button>
                  <Button variant="link" className="mt-4" asChild>
                    <Link to="/forgetPassword">Forgot Password</Link>
                  </Button>
                  {/* Display error message if there is one */}
                  {error && <div className="text-red-500">{error}</div>}
                </div>
              </CardFooter>
            </form>
          </Form>
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
