'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { IconCheck, IconLoader3 } from "@tabler/icons-react";
import { HiOutlinePhotograph, HiOutlineUserCircle, HiOutlineUsers, HiOutlineHashtag } from "react-icons/hi";
import { RiImageAddLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const AddPost = () => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [previewUrl, setPreviewUrl] = useState('');
    const [communities, setCommunities] = useState([]);

    const router = useRouter()

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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <h1 className="text-3xl font-extrabold text-white text-center mb-8">Create Post</h1>
                        <form onSubmit={postForm.handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={postForm.values.title}
                                        onChange={postForm.handleChange}
                                        placeholder="Add a title..."
                                        required
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                    <HiOutlineHashtag className="absolute right-3 top-3 text-gray-400 text-xl" />
                                </div>

                                <div className="relative">
                                    <textarea
                                        id="caption"
                                        name="caption"
                                        value={postForm.values.caption}
                                        onChange={postForm.handleChange}
                                        placeholder="Write a caption..."
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                                        rows={4}
                                    ></textarea>
                                </div>

                                <div className="relative">
                                    <select
                                        type="text"
                                        id="community"
                                        name="community"
                                        value={postForm.values.community}
                                        onChange={postForm.handleChange}
                                        placeholder="Enter community..."
                                        required
                                        className="w-full px-4 py-3 pl-10 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    >
                                        <option>select community</option>
                                        {
                                            communities.map(community => (
                                                <option key={community._id} value={community.title}>{community.title}</option>
                                            ))
                                        }
                                    </select>
                                    <HiOutlineUsers className="absolute left-3 top-3 text-gray-400 text-xl" />
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        id="postedBy"
                                        name="postedBy"
                                        value={postForm.values.postedBy}
                                        onChange={postForm.handleChange}
                                        placeholder="username..."
                                        required
                                        className="w-full px-4 py-3 pl-10 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                    <HiOutlineUserCircle className="absolute left-3 top-3 text-gray-400 text-xl" />
                                </div>
                            </div>

                            <div className="mt-6">
                                {/* <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">Add Photo</label> */}
                                <div className="mt-1 flex items-center justify-center">
                                    <label className="w-full flex flex-col items-center justify-center px-4 py-6 bg-gray-700 text-white rounded-xl tracking-wide border border-gray-600 cursor-pointer hover:bg-gray-600 hover:border-purple-500 transition duration-300 ease-in-out">
                                        <RiImageAddLine className="w-12 h-12 text-purple-500" />
                                        <span className="mt-2 text-base leading-normal">Add Photo</span>
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={uploadImage}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {previewUrl && (
                                <div className="mt-4">
                                    <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={postForm.isSubmitting || !postForm.values.image}
                                className="w-full py-4 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {postForm.isSubmitting ? <IconLoader3 className="animate-spin mr-2" /> : <IconCheck className="mr-2" />}
                                {postForm.isSubmitting ? 'Sharing...' : 'Share Post'}
                            </button>
                        </form>
                        {message && <p className="mt-4 text-center text-sm text-gray-300">{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;

