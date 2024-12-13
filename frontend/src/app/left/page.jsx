// 'use client'
// import React, { useState } from 'react';
// import Link from 'next/link'
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Leftsidebar = ({ avatar, fname, lname, loadUser, id }) => {
//   const [isInputVisible, setIsInputVisible] = useState(false);
//   const [url, setUrl] = useState('');
//   const [submit, setSubmit] = useState('');

//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();

//     formData.append('file', file);
//     formData.append('upload_preset', 'mehdiicodes');
//     formData.append('cloud_name', 'dpys6yu2j');

//     try {
//       const res = await axios.post('https://api.cloudinary.com/v1_1/dpys6yu2j/image/upload', formData);
//       if (res.status === 200) {
//         updateProfile({ avatar: res.data.url });
//       }
//     } catch (error) {
//       toast.error('Failed to upload image');
//     }
//   };

//   const updateProfile = async (values) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/user/update/${id}`, values);
//       if (res.status === 200) {
//         toast.success('Profile Updated Successfully');
//         loadUser();
//       }
//     } catch (error) {
//       toast.error('Failed to update profile');
//     }
//   }

//   const handleIconClick = () => {
//     setIsInputVisible(true);
//   }

//   const handleInputChange = (event) => {
//     setUrl(event.target.value);
//   }
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (url && isValidUrl(url)) {
//       setSubmit(url);
//       setUrl('');
//       setIsInputVisible(false);
//     } else {
//       toast.error('Please enter a valid URL');
//     }
//   }

//   const isValidUrl = (string) => {
//     const regex = /^(ftp|http|https):\/\/[^ "]+$/;
//     return regex.test(string);
//   };

//   return (
//     <div className="w-full sm:w-[320px] max-w-md p-4 mt-5 ml-4 rounded-lg shadow-lg sm:p-8 sticky top-24 transition-all duration-300 ease-in-out bg-gray-800 text-white">
//       <div className="flow-root">
//         {/* Profile Section */}
//         <div className="py-3 sm:py-4">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 relative group">
//               <img
//                 className="w-16 h-16 rounded-full border-2 border-gray-600 transition-all duration-300 ease-in-out group-hover:border-blue-500"
//                 src={avatar}
//                 alt={`${fname || ''} ${lname || ''}'s Avatar`}
//               />
//               <label
//                 htmlFor='profile'
//                 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               </label>
//               <input
//                 type="file"
//                 id='profile'
//                 className='hidden'
//                 onChange={uploadImage}
//                 accept="image/*"
//               />
//             </div>
//             <div className="flex-1 min-w-0 ms-4">
//               <p className="text-lg font-semibold truncate">{fname || ''} {lname || ''}</p>
//               <p className="text-sm text-gray-400">@{fname?.toLowerCase?.() || ''}{lname?.toLowerCase?.() || ''}</p>
//             </div>
//           </div>
//         </div>

//         {/* User Info */}
//         <div className="mt-6 space-y-4">
//           <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             Add location
//           </div>
//           <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//             Add Profession
//           </div>
//         </div>

//         {/* Activity Info */}
//         <div className="mt-6 space-y-4">
//           <p className="text-lg font-semibold">0 Friends</p>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-300">Profile views</span>
//             <span className="text-blue-400 font-semibold">0</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-300">Joined</span>
//             <span className="text-blue-400 font-semibold">a minute ago</span>
//           </div>
//         </div>

//         {/* Social Profiles */}
//         <div className="mt-6">
//           <p className="text-lg font-semibold mb-4">Social Profile</p>
//           {!isInputVisible && !submit && (
//             <button 
//               onClick={handleIconClick}
//               className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Add Instagram
//             </button>
//           )}
//           {isInputVisible && (
//             <form onSubmit={handleSubmit} className="flex items-center">
//               <input
//                 type='text'
//                 value={url}
//                 onChange={handleInputChange}
//                 placeholder="Enter Instagram URL"
//                 className="flex-grow bg-gray-700 text-white rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button 
//                 type='submit' 
//                 className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-full px-4 py-2 transition-colors duration-300"
//               >
//                 Save
//               </button>
//             </form>
//           )}
//           {submit && (
//             <Link href={submit} className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Instagram
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leftsidebar;

