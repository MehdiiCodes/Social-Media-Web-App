'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

const managecommunitySchema = Yup.object().shape({
  title: Yup.string().required('Write a title here'),
  image: Yup.string().required('Image is required for the post'),
});

const ManageCommunity = () => {
  const router = useRouter();
  const [communityList, setCommunityList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const managecommunityForm = useFormik({
    initialValues: {
      title: '',
      image: '',
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await axios.post('http://localhost:5000/community/add', values);
        toast.success('Community created', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        fetchCommunity();
        resetForm();
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something went wrong', {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: managecommunitySchema,
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mehdiicodes');
    formData.append('cloud_name', 'dpys6yu2j');

    setIsUploading(true);
    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dpys6yu2j/image/upload', formData);
      if (res.status === 200) {
        managecommunityForm.setFieldValue('image', res.data.url);
        toast.success('Image uploaded successfully', {
          icon: '🖼️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error('Failed to upload image', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setIsUploading(false);
    }
  };

  const fetchCommunity = async () => {
    try {
      const res = await axios.get('http://localhost:5000/community/getall');
      setCommunityList(res.data);
    } catch (error) {
      toast.error('Failed to fetch communities', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  const deleteCommunity = async (id) => {
    if (!confirm('Are you sure you want to delete this community?')) return;
    try {
      await axios.delete(`http://localhost:5000/community/delete/${id}`);
      fetchCommunity();
      toast.success('Community deleted successfully', {
        icon: '🗑️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error('Failed to delete community', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h1 className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Manage Communities
        </h1>

        {/* Create Community Form */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gray-800 rounded-2xl shadow-2xl p-8 mb-12 border border-gray-700 transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-500/50"
        >
          <h2 className="text-3xl font-semibold mb-8 text-blue-300">Create New Community</h2>
          <form onSubmit={managecommunityForm.handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-400">Community Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={managecommunityForm.handleChange}
                  value={managecommunityForm.values.title}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
                  placeholder="Enter community title"
                />
                {managecommunityForm.errors.title && managecommunityForm.touched.title && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {managecommunityForm.errors.title}
                  </motion.p>
                )}
              </div>
              <div className="space-y-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-400">Cover Image</label>
                <div className="relative">
                  <label htmlFor="image" className="block text-center bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-600 transition duration-300 transform hover:scale-105">
                    {isUploading ? 'Uploading...' : 'Upload Cover Image'}
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={uploadImage}
                    className="hidden"
                    accept="image/*"
                  />
                  {managecommunityForm.values.image && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 relative group"
                    >
                      <img src={managecommunityForm.values.image} alt="Preview" className="w-full h-32 object-cover rounded-lg transition-all duration-300 group-hover:opacity-75" />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => managecommunityForm.setFieldValue('image', '')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={managecommunityForm.isSubmitting || !managecommunityForm.values.image || isUploading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:shadow-lg"
            >
              {managecommunityForm.isSubmitting ? 'Creating...' : 'Create Community'}
            </motion.button>
          </form>
        </motion.div>

        {/* Community List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-500/50"
        >
          <h2 className="text-3xl font-semibold mb-8 text-blue-300">Your Communities</h2>
          {communityList.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No communities available</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {communityList.map((community) => (
                <motion.div
                  key={community._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative group">
                    <img src={community.image} alt={community.title} className="w-full h-48 object-cover transition-all duration-300 group-hover:opacity-75" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteCommunity(community._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                      >
                        Delete Community
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-200 truncate">{community.title}</h3>
                    <p className="text-gray-400 text-sm">Created on: {new Date(community.createdAt).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ManageCommunity;