"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const Feed = ({ selCommunity }) => {
  const [postList, setPostList] = useState([])
  const [masterList, setMasterList] = useState([])
  const [newPostsCount, setNewPostsCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState({})

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
    const interval = setInterval(() => {
      setNewPostsCount(prev => prev + Math.floor(Math.random() * 3))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selCommunity) {
      setPostList(
        masterList.filter((post) => post.community.toLowerCase() === selCommunity.toLowerCase())
      )
    }
  }, [selCommunity, masterList])

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/post/like/${postId}`)
      setPostList(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
        )
      )
    } catch (error) {
      toast.error('Failed to like the post.')
    }
  }

  const handleShare = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/post/share/${postId}`)
      setPostList(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, shares: (post.shares || 0) + 1 } : post
        )
      )
    } catch (error) {
      toast.error('Failed to share the post.')
    }
  }

  const handleEdit = (postId) => {
    // Navigate to edit post page
    window.location.href = `/editpost/${postId}`
  }

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/post/delete/${postId}`)
      setPostList(prevPosts => prevPosts.filter(post => post._id !== postId))
      toast.success('Post deleted successfully.')
    } catch (error) {
      toast.error('Failed to delete the post.')
    }
  }

  const toggleMenu = (postId) => {
    setMenuOpen(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const loadNewPosts = () => {
    fetchPost()
    setNewPostsCount(0)
  }

  const formatTimestamp = (date) => {
    const now = new Date()
    const diff = now - new Date(date)
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search posts"
                  onChange={filterPosts}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Link href="/addpost">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {newPostsCount > 0 && (
          <button
            onClick={loadNewPosts}
            className="w-full mb-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
          >
            {newPostsCount} new post{newPostsCount > 1 ? 's' : ''}
          </button>
        )}

        {postList.map((post) => (
          <div key={post._id} className="mb-6 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-gray-700">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                <img src={post.userAvatar || "/images/user1.jpeg"} alt={post.userName || 'Anonymous'} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-100">{post.postedBy || 'Anonymous'}</h3>
                <p className="text-xs text-gray-400">{formatTimestamp(post.createdAt)}</p>
              </div>
              <div className="relative">
                <button 
                  className="text-gray-400 hover:text-gray-300"
                  onClick={() => toggleMenu(post._id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                {menuOpen[post._id] && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-lg shadow-lg">
                    <button onClick={() => handleEdit(post._id)} className="w-full px-4 py-2 text-left text-gray-100 hover:bg-gray-600">Edit Post</button>
                    <button onClick={() => handleDelete(post._id)} className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-600">Delete Post</button>
                    <button onClick={() => handleShare(post._id)} className="w-full px-4 py-2 text-left text-purple-500 hover:bg-gray-600">Share Post</button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-4">{post.caption}</p>
              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex justify-between p-4 border-t border-gray-700">
              <button 
                onClick={() => handleLike(post._id)}
                className="flex items-center text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>{post.likes || 0}</span>
              </button>
              <button 
                onClick={() => handleShare(post._id)}
                className="flex items-center text-gray-400 hover:text-purple-400 transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>{post.shares || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
