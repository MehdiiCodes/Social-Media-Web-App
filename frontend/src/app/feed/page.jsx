'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Search, Heart, MessageCircle, Share2, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const Feed = ({ selCommunity }) => {
  const [postList, setPostList] = useState([])
  const [masterList, setMasterList] = useState([])

  const filterPosts = (e) => {
    const v = e.target.value
    setPostList(
      masterList.filter((post) => post.caption.toLowerCase().includes(v.toLowerCase()))
    )
  }

  const fetchPost = async () => {
    try {
      const res = await axios.get('http://localhost:5000/post/getall')
      setPostList(res.data)
      setMasterList(res.data)
    } catch (error) {
      toast.error('Failed to fetch posts. Please try again later.')
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  useEffect(() => {
    if (selCommunity) {
      setPostList(
        masterList.filter((post) => post.community.toLowerCase() === selCommunity.toLowerCase())
      )
    }
  }, [selCommunity, masterList])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8 bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search posts"
                  onChange={filterPosts}
                  className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/Createpost">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {postList.map((post) => (
          <Card key={post._id} className="mb-6 bg-gray-900 border-gray-800 overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
              <Avatar>
                <AvatarImage src={post.userAvatar || "/images/user1.jpeg"} alt={post.userName || 'Anonymous'} />
                <AvatarFallback>{post.userName ? post.userName[0] : 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">{post.userName || 'Anonymous'}</h3>
                <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-300 mb-4">{post.caption}</p>
              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between p-4 border-t border-gray-800">
              <Button variant="ghost" className="text-pink-400 hover:text-pink-300 hover:bg-gray-800">
                <Heart className="w-5 h-5 mr-2" />
                <span>{post.likes || 0}</span>
              </Button>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span>{post.comments || 0}</span>
              </Button>
              <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-gray-800">
                <Share2 className="w-5 h-5 mr-2" />
                <span>{post.shares || 0}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Feed

