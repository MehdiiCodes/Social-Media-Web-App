'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Search, Trash2, Heart, Share2, PenSquare } from 'lucide-react'

const ManagePost = ({ selCommunity }) => {
  const [postList, setPostList] = useState([])
  const [masterList, setMasterList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const filterPosts = () => {
    if (!searchTerm) {
      setPostList(masterList)
    } else {
      setPostList(
        masterList.filter((post) =>
          post.caption.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
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
    filterPosts()
  }, [searchTerm, masterList])

  useEffect(() => {
    if (selCommunity) {
      setPostList(
        masterList.filter((post) => post.community.toLowerCase() === selCommunity.toLowerCase())
      )
    }
  }, [selCommunity, masterList])

  const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      const res = await axios.delete(`http://localhost:5000/post/delete/${id}`)
      if (res.status === 200) {
        fetchPost()
        toast.success('Post deleted successfully')
      } else {
        toast.error('Failed to delete post')
      }
    } catch (error) {
      toast.error('An error occurred while deleting the post.')
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search posts"
                  className="w-full bg-gray-700 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Link
                href="/Createpost"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
              >
                <PenSquare className="mr-2" size={18} />
                New Post
              </Link>
            </div>
          </div>
        </div>

        {postList.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-400">No posts found. Create your first post!</p>
          </div>
        ) : (
          postList.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-lg overflow-hidden mb-6 shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={post.userAvatar || "/placeholder-avatar.jpg"}
                    alt={post.userName || 'Anonymous'}
                  />
                  <div>
                    <p className="font-semibold text-white">{post.userName || 'Anonymous'}</p>
                    <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
                  </div>
                </div>
                <button
                  onClick={() => deletePost(post._id)}
                  className="text-gray-400 hover:text-red-500 transition duration-300"
                  aria-label="Delete post"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <p className="text-lg text-gray-200">{post.caption}</p>
                {post.image && (
                  <img
                    className="w-full h-64 object-cover rounded-lg"
                    src={post.image}
                    alt="Post content"
                  />
                )}
                <div className="flex justify-between text-sm text-gray-400">
                  <button className="flex items-center space-x-2 hover:text-pink-500 transition duration-300">
                    <Heart size={18} />
                    <span>{post.likes || 0} likes</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-500 transition duration-300">
                    <Share2 size={18} />
                    <span>{post.shares || 0} shares</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ManagePost

