import React, { useState } from 'react'

export default function EditPostForm({ post, onSubmit }) {
  const [caption, setCaption] = useState(post.caption)
  const [community, setCommunity] = useState(post.community)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ caption, community })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-300">
          Caption
        </label>
        <textarea
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>
      <div>
        <label htmlFor="community" className="block text-sm font-medium text-gray-300">
          Community
        </label>
        <input
          type="text"
          id="community"
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        href="/feed"
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
      >
        
        Update Post
      </button>
    </form>
  )
}

