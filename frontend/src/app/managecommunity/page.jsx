'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { IconCheck, IconLoader3, IconUpload } from '@tabler/icons-react';
import Header from '@/components/Header';


const managecummunitySchema = Yup.object().shape({
  title: Yup.string().required('Write a title here'),
  image: Yup.string().required('Image is required for the post'),
});

const Rightsidebar = () => {
  const router = useRouter();
  const [communityList, setCommunityList] = useState([]);

  const managecommunityForm = useFormik({
    initialValues: {
      title: '',
      image: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      axios.post('http://localhost:5000/community/add', values)
        .then((result) => {
          toast.success('Community created');
          fetchCommunity();
          resetForm();
        }).catch((err) => {
          toast.error(err?.response?.data?.message || 'Something went wrong');
          setSubmitting(false);
        });
    },
    validationSchema: managecummunitySchema,
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'preset553');
    formData.append('cloud_name', 'dwol2gffj');

    const res = await axios.post('https://api.cloudinary.com/v1_1/dwol2gffj/image/upload', formData);
    if (res.status === 200) {
      managecommunityForm.setFieldValue('image', res.data.url);
      toast.success('Image uploaded successfully');
    }
  };

  const fetchCommunity = async () => {
    const res = await axios.get('http://localhost:5000/community/getall');
    setCommunityList(res.data);
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  const deleteCommunity = async (id) => {
    if (!confirm('Are you sure you want to delete this community?')) return;
    const res = await axios.delete(`http://localhost:5000/community/delete/${id}`);
    if (res.status === 200) {
      fetchCommunity();
      toast.success('Community deleted successfully');
    } else {
      toast.error('Failed to delete community');
    }
  };

  return (
    <>
    
    <div className="min-h-screen bg-cover bg-center  bg-fixed dark:bg-gray-800">
    <Header></Header>
      <div className=" px-4 mt-5  ">
        {/* Left Side Form */}
        <div className="w-full bg-white dark:bg-gray-900 dark:border-gray-700 border rounded-lg shadow-lg sm:p-8 transition-all duration-300 ">
  <form className="space-y-6 " onSubmit={managecommunityForm.handleSubmit}>
    {/* Form Fields in Row */}
    <div className="flex justify-between items-center">
      {/* Title Input */}
      <div children='w-full'>
        <label htmlFor="title" className="  block mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      
        </label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={managecommunityForm.handleChange}
          value={managecommunityForm.values.title}
          className="bg-transparent dark:bg-gray-800 w-[400px] dark:text-white border border-gray-300 dark:border-gray-500 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  p-3 transition-all duration-300"
          placeholder="Enter community title"
          aria-label="Community Title"
        />
        {managecommunityForm.errors.title && managecommunityForm.touched.title && (
          <p className="text-xs text-red-600 mt-2">{managecommunityForm.errors.title}</p>
        )}
      </div>
      
    
      {/* Image Upload */}
      <div>
        <label htmlFor="image" className=" dark:bg-transparent dark:text-white border border-gray-300 dark:border-gray-500 text-lg rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none  p-2 pr-5 text-center transition-all duration-300 mr-[400px] flex items-center ">
          <span className='mr-2 pl-5 text-blue-500 '><IconUpload></IconUpload></span>cover
        </label>
        <input
          type="file"
          id="image"
          onChange={uploadImage}
          className="hidden"
          required
          aria-label="Upload Image"
        />
      </div>
    {/* Submit Button  */}
    <button
      type="submit"
      disabled={managecommunityForm.isSubmitting || !managecommunityForm.values.image}
      className="flex items-center justify-center gap-3  py-3 px-4  text-sm  font-medium rounded-lg border border-transparent bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-300 hover:bg-blue-700 dark:hover:bg-blue-800 transition-all"
    >
      {managecommunityForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
      {managecommunityForm.isSubmitting ? 'Uploading...' : 'Create Community'}
    </button>


    </div>
  </form>
</div>


        {/* Right Side - Your Community List */}
        <div className="w-full bg-white bg-opacity-90 dark:bg-gray-800 dark:border-gray-700 border mt-5 rounded-lg shadow-sm sm:p-8 sticky top-24 transition-all duration-300 ">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">Your Communities</h5>
          </div>
          <div className="flow-root mt-5">
            {communityList.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-300">No communities available</p>
            ) : (
              communityList.map((community) => (
                <div key={community._id} className="py-3 sm:py-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li>
                      <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                          <img className="h-16 rounded-md" src={community.image} alt="Community Avatar" />
                        </div>
                        <div className="mr-[800px] min-w-0 ms-4">
                          <p className="text-md  font-medium text-gray-900 dark:text-white truncate">{community.title}</p>
                        </div>
                        <button
                          className="inline-flex items-center text-base font-semibold text-red-500 hover:text-red-700 transition-all duration-300"
                          onClick={() => deleteCommunity(community._id)}
                          aria-label="Delete Community"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Rightsidebar;