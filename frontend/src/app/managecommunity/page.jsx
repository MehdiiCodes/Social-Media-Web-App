'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Header from '@/components/Header';

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
        toast.success('Community created');
        fetchCommunity();
        resetForm();
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Something went wrong');
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
    formData.append('upload_preset', 'preset553');
    formData.append('cloud_name', 'dwol2gffj');

    setIsUploading(true);
    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dwol2gffj/image/upload', formData);
      if (res.status === 200) {
        managecommunityForm.setFieldValue('image', res.data.url);
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const fetchCommunity = async () => {
    try {
      const res = await axios.get('http://localhost:5000/community/getall');
      setCommunityList(res.data);
    } catch (error) {
      toast.error('Failed to fetch communities');
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
      toast.success('Community deleted successfully');
    } catch (error) {
      toast.error('Failed to delete community');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Manage Communities</h1>
        
        {/* Create Community Form */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create New Community</h2>
          <form onSubmit={managecommunityForm.handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="title"
                  onChange={managecommunityForm.handleChange}
                  value={managecommunityForm.values.title}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter community title"
                />
                {managecommunityForm.errors.title && managecommunityForm.touched.title && (
                  <p className="text-red-500 text-sm mt-1">{managecommunityForm.errors.title}</p>
                )}
              </div>
              <div className="flex-1">
                <label htmlFor="image" className="cursor-pointer flex items-center justify-center w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 hover:bg-gray-600 transition duration-300">
                  {isUploading ? (
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {isUploading ? 'Uploading...' : 'Upload Cover Image'}
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={uploadImage}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={managecommunityForm.isSubmitting || !managecommunityForm.values.image || isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {managecommunityForm.isSubmitting ? 'Creating...' : 'Create Community'}
            </button>
          </form>
        </div>
        
        {/* Community List */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Communities</h2>
          {communityList.length === 0 ? (
            <p className="text-gray-400">No communities available</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {communityList.map((community) => (
                <div key={community._id} className="bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                  <img src={community.image} alt={community.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{community.title}</h3>
                    <button
                      onClick={() => deleteCommunity(community._id)}
                      className="text-red-500 hover:text-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCommunity;

