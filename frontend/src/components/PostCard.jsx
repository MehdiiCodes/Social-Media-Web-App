import React, { useState } from 'react';

const PostCard = ({ post, onLike, onShare, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="mb-6 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-lg shadow-lg">
              <button onClick={() => onEdit(post._id)} className="w-full px-4 py-2 text-left text-gray-100 hover:bg-gray-600">Edit Post</button>
              <button onClick={() => onDelete(post._id)} className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-600">Delete Post</button>
              <button onClick={() => onShare(post._id)} className="w-full px-4 py-2 text-left text-purple-500 hover:bg-gray-600">Share Post</button>
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
          onClick={() => onLike(post._id)}
          className="flex items-center text-gray-400 hover:text-blue-400 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>{post.likes || 0}</span>
        </button>
        <button
          onClick={() => onShare(post._id)}
          className="flex items-center text-gray-400 hover:text-purple-400 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>{post.shares || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;