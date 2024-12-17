'use client'
import React, { useEffect, useState } from 'react';
import { IconBrandDatabricks, IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconMapPin, IconPhotoPlus } from '@tabler/icons-react';
import Link from 'next/link'
import axios from 'axios';

import toast from 'react-hot-toast';

const Leftsidebar = ({ avatar, fname, lname, loadUser, id, link }) => {

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'preset553');
    formData.append('cloud_name', 'dwol2gffj');

    const res = await axios.post('https://api.cloudinary.com/v1_1/dwol2gffj/image/upload', formData);
    if (res.status === 200) {
      updateProfile({ avatar: res.data.url });
    }
  };

  const updateProfile = async (values) => {
    console.log(values);

    const res = await axios.put(`http://localhost:5000/user/update/${id}`, values);
    if (res.status === 200) {
      toast.success('profile Updated Successfully');
      loadUser();
    }

  }

  //saver social media 
  const [isinputVisible, setisinputVisible] = useState(false)
  const [url, seturl] = useState('')
  const [submit, setsubmit] = useState(link)
  const handleiconclick = () => {
    setisinputVisible(true)
    // axios.get('http://localhost:5000/user/getall')

  }

  const handleinputchange = (event) => {
    seturl(event.target.value)
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (url && isValidUrl(url)) {
      setsubmit(url);
      updateProfile({ link: url });
      seturl('');
      setisinputVisible(false);

    } else {
      toast.error('please inter a valid url')
    }
  }
  const isValidUrl = (string) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(string);
  };

  return (
    <div className="w-full sm:w-[320px] max-w-md p-4 mt-5 ml-4 rounded-lg shadow sm:p-8 sticky top-24 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="flow-root">
        {/* Profile Section */}
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full border-2 border-white transition-all duration-300 ease-in-out hover:border-blue-500"
                  src={avatar}
                  alt="User Avatar"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{fname} {lname}</p>

              </div>
              <div>
                <label
                  htmlFor='profile'
                  className="inline-flex items-center text-base font-semibold text-blue-600 dark:text-blue-400 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-400">
                  <IconPhotoPlus />
                </label>
                <input
                  type="file"
                  id='profile'
                  className='hidden'
                  onChange={uploadImage}
                  required
                />

              </div>
            </div>
          </li>
        </ul>

        {/* Separator */}
        <div className="border-b border-b-gray-600 mt-2"></div>

        {/* User Info */}
        <div className="mx-4 mt-4">
          <p className="text-gray-600 flex gap-2 dark:text-gray-300"><IconMapPin className="text-gray-300 dark:text-gray-600" />Add location </p>
          <p className="text-gray-600 flex mt-2 gap-2 dark:text-gray-300"><IconBrandDatabricks className="text-gray-300 dark:text-gray-600" /> Add Profession</p>
        </div>

        {/* Separator */}
        <div className="border-b border-b-gray-600 mt-2"></div>

        {/* Activity Info */}
        <div className="mt-4 mx-4">
          <p className="text-gray-600 text-md text-gray-900 dark:text-white font-bold">0 Friends</p>
          <p className="text-gray-600 flex mt-2 gap-2 justify-between dark:text-gray-300">
            Who viewed your profile
            <span className="text-gray-900 dark:text-white text-sm">0</span>
          </p>
          <p className="text-gray-600 flex mt-2 gap-2 justify-between dark:text-gray-300">
            Joined
            <span className="text-gray-900 dark:text-white text-sm">a minute ago</span>
          </p>
        </div>

        {/* Separator */}
        <div className="border-b border-b-gray-600 mt-2"></div>

        {/* Social Profiles */}
        <div className="mt-4 mx-4">
          <p className="text-gray-600 text-md text-gray-900 dark:text-white font-bold">Social Profile</p>
          <div className="flex flex-col mt-2 gap-2">
            {!isinputVisible && !submit && (
              <p >
                <button className="text-gray-600 flex gap-2 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out dark:text-gray-300 dark:hover:text-blue-400" onClick={handleiconclick}>
                  <IconBrandInstagram className="text-gray-300 dark:text-gray-600" /> Instagram
                </button>
              </p>
            )}
            {isinputVisible && (
              <form onSubmit={handlesubmit} >
                <p className='flex '>
                  <input
                    type='text'
                    value={url}
                    onChange={handleinputchange}
                    className="text-gray-600 flex gap-2  hover:text-blue-500  dark:text-gray-400 dark:hover:text-blue-400 bg-gray-300 rounded-full px-2 dark:bg-gray-600 "
                  />
                  <button type='submit' className='" text-white rounded-full p-1 ml-5  bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out'> save</button>
                </p>

              </form>
            )}



            <div>
              {submit && (
                <Link href={submit} target='_blank'>
                  <p className="text-gray-600 flex gap-2 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out dark:text-gray-300 dark:hover:text-blue-400" >
                    <IconBrandInstagram className="text-gray-300 dark:text-gray-600" /> Instagram
                  </p>
                </Link>

              )}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Leftsidebar;