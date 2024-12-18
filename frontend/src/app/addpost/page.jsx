'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const AddPost = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [previewUrl, setPreviewUrl] = useState('');
    const [communities, setCommunities] = useState([]);

    const postForm = useFormik({
        initialValues: {
            title: '',
            caption: '',
            image: '',
            postedBy: '',
            community: ''
        },
        onSubmit: (values, { resetForm, setSubmitting }) => {
            console.log(values);
            axios.post('http://localhost:5000/post/add', values)
                .then((result) => {
                    toast.success('Post Uploaded Successfully');
                    resetForm();
                    // Assuming you have router imported
                    router.push('/feed');
                }).catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.message || 'Something went Wrong');
                    setSubmitting(false);
                });
        }
    });

    const fetchCommunities = async () => {
        const res = await axios.get('http://localhost:5000/community/getall');
        console.log(res.data);
        setCommunities(res.data);
    }

    useEffect(() => {
        fetchCommunities();
    }, [])

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'mehdiicodes');
        formData.append('cloud_name', 'dpys6yu2j');

        const res = await axios.post('https://api.cloudinary.com/v1_1/dpys6yu2j/image/upload', formData);
        if (res.status === 200) {
            postForm.setFieldValue('image', res.data.url);
            setPreviewUrl(res.data.url);
            toast.success('Image uploaded successfully');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-center mb-6">Create Post</h1>
                        <form onSubmit={postForm.handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="group">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1 transition-colors duration-200 group-hover:text-blue-400">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={postForm.values.title}
                                        onChange={postForm.handleChange}
                                        placeholder="Add a title..."
                                        required
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 transform group-hover:scale-105"
                                    />
                                </div>

                                <div className="group">
                                    <label htmlFor="caption" className="block text-sm font-medium text-gray-300 mb-1 transition-colors duration-200 group-hover:text-blue-400">Caption</label>
                                    <textarea
                                        id="caption"
                                        name="caption"
                                        value={postForm.values.caption}
                                        onChange={postForm.handleChange}
                                        placeholder="Write a caption..."
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none transform group-hover:scale-105"
                                        rows={4}
                                    ></textarea>
                                </div>

                                <div className="group">
                                    <label htmlFor="community" className="block text-sm font-medium text-gray-300 mb-1 transition-colors duration-200 group-hover:text-blue-400">Community</label>
                                    <select
                                        id="community"
                                        name="community"
                                        value={postForm.values.community}
                                        onChange={postForm.handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none transform group-hover:scale-105"
                                    >
                                        <option value="">Select community</option>
                                        {communities.map(community => (
                                            <option key={community._id} value={community.title}>{community.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="group">
                                    <label htmlFor="postedBy" className="block text-sm font-medium text-gray-300 mb-1 transition-colors duration-200 group-hover:text-blue-400">Username</label>
                                    <input
                                        type="text"
                                        id="postedBy"
                                        name="postedBy"
                                        value={postForm.values.postedBy}
                                        onChange={postForm.handleChange}
                                        placeholder="Your username..."
                                        required
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 transform group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-200 group-hover:text-blue-400">Add Photo</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md transition-all duration-300 hover:border-blue-500 hover:bg-gray-700 group-hover:scale-105">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 transition-colors duration-200 group-hover:text-blue-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-400">
                                            <label htmlFor="image" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors duration-200">
                                                <span>Upload a file</span>
                                                <input id="image" name="image" type="file" className="sr-only" onChange={uploadImage} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            {previewUrl && (
                                <div className="mt-4 group">
                                    <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover rounded-md transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg" />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={postForm.isSubmitting || !postForm.values.image}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center transform hover:scale-105 hover:shadow-lg"
                            >
                                {postForm.isSubmitting ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {postForm.isSubmitting ? 'Sharing...' : 'Share Post'}
                            </button>
                        </form>
                        {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;

