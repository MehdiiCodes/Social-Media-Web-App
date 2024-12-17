import React, { useState } from 'react'

export default function EditPostForm({ post, onSubmit }) {
  const [caption, setCaption] = useState(post.caption)
  const [community, setCommunity] = useState(post.community)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ caption, community })
  }

  const formStyle = {
    padding: '32px',
    backgroundColor: '#1E1E1E',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    maxWidth: '500px',
    margin: '0 auto',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#E0E0E0',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    border: '1px solid #3A3A3A',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    outline: 'none',
  }

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    marginTop: '24px',
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(59, 130, 246, 0.25)',
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={{ marginBottom: '24px' }}>
        <label htmlFor="caption" style={labelStyle}>
          Caption
        </label>
        <textarea
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            ...inputStyle,
            height: '120px',
            resize: 'vertical',
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 0 2px #4B5563'
            e.target.style.borderColor = '#4B5563'
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none'
            e.target.style.borderColor = '#3A3A3A'
          }}
          required
        />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label htmlFor="community" style={labelStyle}>
          Community
        </label>
        <select
          type="text"
          id="community"
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 0 2px #4B5563'
            e.target.style.borderColor = '#4B5563'
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none'
            e.target.style.borderColor = '#3A3A3A'
          }}
          required
        />
      </div>
      <button
        type="submit"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#2563EB'
          e.target.style.transform = 'translateY(-2px)'
          e.target.style.boxShadow = '0 6px 12px rgba(59, 130, 246, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#3B82F6'
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = '0 4px 6px rgba(59, 130, 246, 0.25)'
        }}
      >
        Update Post
      </button>
    </form>
  )
}