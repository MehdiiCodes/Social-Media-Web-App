'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Home, Search, User, Menu, X, MessageSquare, PlusSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Create', path: '/create', icon: PlusSquare },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ]

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-white text-xl font-bold">SocialApp</span>
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 rounded-full"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-gray-300 hover:bg-gray-800 hover:text-white rounded-full ${
                    isActive(item.path) ? 'bg-gray-800 text-white' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Button>
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 bg-gray-800 border-gray-700">
                <DropdownMenuItem className="text-gray-200 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-200 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 rounded-full">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left text-gray-300 hover:bg-gray-800 hover:text-white ${
                    isActive(item.path) ? 'bg-gray-800 text-white' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:bg-gray-800 hover:text-white">
              <User className="h-5 w-5 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:bg-gray-800 hover:text-white">
              Log out
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

