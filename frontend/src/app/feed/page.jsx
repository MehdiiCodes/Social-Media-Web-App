"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import SearchBar from '@/components/SearchBar'
import PostCard from '@/components/PostCard'
import Header from '@/components/Header'
import FeatureToggle from '@/components/FeatureToggle'


const Feed = ({ selCommunity }) => {
  const [postList, setPostList] = useState([])
  const [masterList, setMasterList] = useState([])
  const [newPostsCount, setNewPostsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const filterPosts = (e) => {
    const v = e.target.value
    setPostList(
      masterList.filter((post) => post.caption.toLowerCase().includes(v.toLowerCase()))
    )
  }

  const fetchPost = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('http://localhost:5000/post/getall')
      setPostList(res.data)
      setMasterList(res.data)
    } catch (error) {
      toast.error('Failed to fetch posts. Please try again later.')
    }
    setIsLoading(false)
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

  // ... (previous state declarations remain the same)

  const handleShare = async (postId) => {
    try {
      const postToShare = postList.find(post => post._id === postId);
      if (!postToShare) {
        throw new Error('Post not found');
      }
  
      if (navigator.share) {
        await navigator.share({
          title: postToShare.caption,
          text: postToShare.content,
          url: `${window.location.origin}/post/${postId}`,
        });
        
        // Update share count on the server
        const res = await axios.post(`http://localhost:5000/post/share/${postId}`);
        
        // Update local state
        setPostList(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, shares: res.data.shares } : post
          )
        );
        
        toast.success('Post shared successfully!');
      } else {
        // Fallback for browsers that don't support Web Share API
        toast.error('Sharing is not supported on this browser.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        toast.error('Failed to share the post.');
      }
    }
  };
  

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

  const loadNewPosts = () => {
    fetchPost()
    setNewPostsCount(0)
  }

  const renderPosts = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )
    }

    if (postList.length === 0) {
      return <p className="text-center text-gray-400 mt-8">No posts found.</p>
    }

    return postList.map((post) => (
      <PostCard
        key={post._id}
        post={post}
        onLike={handleLike}
        onShare={handleShare}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <SearchBar onSearch={filterPosts} />
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

        {renderPosts()}
        {/* <FeatureToggle id="userId" /> */}
      </div>
    </div>
  )
}

export default Feed

