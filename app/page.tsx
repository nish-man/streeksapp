import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our App</h1>
        <p className="text-lg text-gray-600 mb-8">
          A full-stack Next.js application with Supabase authentication and data storage.
        </p>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="block w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

