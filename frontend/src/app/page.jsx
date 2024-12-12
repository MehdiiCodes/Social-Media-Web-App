import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SocialApp</h1>
          <p className="text-gray-400">Connect with friends and the world around you.</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 space-y-4">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/login">Log In</Link>
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or</span>
            </div>
          </div>
          <Button asChild variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
            <Link href="/signup">Create New Account</Link>
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
        </div>
      </div>
    </div>
  )
}

