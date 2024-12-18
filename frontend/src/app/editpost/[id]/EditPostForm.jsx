import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdvancedEditPostForm({ post, onSubmit, communities: initialCommunities }) {
  const [formData, setFormData] = useState({
    caption: post.caption || '',
    community: post.community || '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [communities, setCommunities] = useState(initialCommunities || [])

  useEffect(() => {
    setCharCount(formData.caption.length)
  }, [formData.caption])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (formData.caption.length < 10) newErrors.caption = 'Caption must be at least 10 characters long'
    if (formData.caption.length > 280) newErrors.caption = 'Caption must not exceed 280 characters'
    if (!formData.community) newErrors.community = 'Please select a community'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form or show success message
    } catch (error) {
      setErrors({ submit: 'Failed to update post. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchCommunities = async () => {
    const res = await axios.get('http://localhost:5000/community/getall')
    console.log(res.data)
    setCommunities(res.data)
  }

  useEffect(() => {
    fetchCommunities()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-8 transition-all duration-300 ease-in-out hover:shadow-3xl transform hover:-translate-y-1">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Edit Your Post</h2>
        
        <div className="space-y-6">
          <div className="relative">
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border ${errors.caption ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ease-in-out resize-none min-h-[120px]`}
              required
            />
            {errors.caption && <p className="mt-1 text-xs text-red-500">{errors.caption}</p>}
            <p className={`mt-1 text-xs ${charCount > 280 ? 'text-red-500' : 'text-gray-500'}`}>
              {charCount}/280 characters
            </p>
          </div>

          <div className="relative">
            <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-2">
              Community
            </label>
            <select
              id="community"
              name="community"
              value={formData.community}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border ${errors.community ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ease-in-out appearance-none`}
              required
            >
              <option value="">Select community</option>
              {
                communities.map(community => (
                  <option key={community._id} value={community.title}>{community.title}</option>
                ))
              }
            </select>
            {errors.community && <p className="mt-1 text-xs text-red-500">{errors.community}</p>}
          </div>
        </div>

        {errors.submit && <p className="text-center text-red-500">{errors.submit}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Update Post'}
        </button>
      </form>
    </div>
  )
}