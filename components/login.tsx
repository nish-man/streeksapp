"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { Trophy } from "lucide-react"
import { createBrowserSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface LoginProps {
  onLogin?: () => void
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // If onLogin callback exists, use it, otherwise use router
      if (onLogin) {
        onLogin()
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error: any) {
      setError(error.message || "Failed to sign in")
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) throw error
    } catch (error: any) {
      setError(error.message || "Failed to sign in with Google")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome to Streek</h1>
          <p className="text-gray-600">Your fitness accountability partner</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Sign in to your account</CardTitle>
            <CardDescription>Continue your fitness journey with Streek</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                type="email" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
              />
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary-dark" 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
              {loading ? (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent"></div>
              ) : (
                <FcGoogle className="mr-2 h-5 w-5" />
              )}
              Google
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

