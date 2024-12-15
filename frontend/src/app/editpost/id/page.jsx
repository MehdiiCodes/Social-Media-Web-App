"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Header from '@/components/Header'
import EditPostForm from './EditPostForm'

export default function EditPost() {
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/post/${params.id}`)
        setPost(res.data)
      } catch (error) {
        toast.error('Failed to fetch post. Please try again later.')
      }
      setIsLoading(false)
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (updatedPost) => {
    try {
      await axios.put(`http://localhost:5000/post/update/${params.id}`, updatedPost)
      toast.success('Post updated successfully.')
      router.push('/')
    } catch (error) {
      toast.error('Failed to update post. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        {post && <EditPostForm post={post} onSubmit={handleSubmit} />}
      </div>
    </div>
  )
}

