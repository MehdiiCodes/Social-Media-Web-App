import Link from 'next/link'
// import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">SocialApp</h1>
          <p className="text-gray-400">Connect with friends and the world around you.</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
          </p>
        </div>
      </div>
    </div>
  )
}

