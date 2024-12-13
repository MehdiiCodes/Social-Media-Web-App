'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
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
              <Link href="/Createpost" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Post
                </button>
              </Link>
            </div>
          </div>
        </div>

        {postList.map((post) => (
          <div key={post._id} className="mb-6 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
            <div className="flex items-center gap-4 p-4 border-b border-gray-700">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600">
                <img src={post.userAvatar || "/images/user1.jpeg"} alt={post.userName || 'Anonymous'} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">{post.userName || 'Anonymous'}</h3>
                <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
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
              <button className="flex items-center text-pink-400 hover:text-pink-300 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes || 0}</span>
              </button>
              <button className="flex items-center text-blue-400 hover:text-blue-300 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments || 0}</span>
              </button>
              <button className="flex items-center text-green-400 hover:text-green-300 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

