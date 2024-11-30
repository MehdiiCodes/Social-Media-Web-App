'use client'
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const AddPost = () => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const postForm = useFormik({
        initialValues: {
            title: '',
            caption: '',
            postedBy: '',
            community: ''
        },
        onSubmit: (values, { resetForm, setSubmitting }) => {
            console.log(values);
            axios.post('http://localhost:5000/user/post', values)
                .then((result) => {
                    toast.success('User Registered Successfully');
                    resetForm();
                    router.push('/feed');
                }).catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.message || 'Semething went Wrong');
                    setSubmitting(false);
                });
        }
    });

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Create a New Post</h1>
            <form onSubmit={postForm.handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label htmlFor="title" style={styles.label}>Post Title</label>
                    <input
                        type="text"
                        id="title"
                        value={postForm.values.title}
                        onChange={postForm.handleChange}
                        placeholder="Enter the title of your post"
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label htmlFor="caption" style={styles.label}>Caption</label>
                    <textarea
                        id="caption"
                        value={postForm.caption}
                        onChange={postForm.handleChange}
                        placeholder="Add a caption (optional)"
                        style={styles.textarea}
                    ></textarea>
                </div>

                <div style={styles.field}>
                    <label htmlFor="image" style={styles.label}>Post</label>
                    <input
                        type="file"
                        id="image"
                        value={postForm.image}
                        onChange={postForm.handleChange}
                        placeholder="Upload the Post"
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label htmlFor="community" style={styles.label}>Community ID</label>
                    <input
                        type="text"
                        id="community"
                        name="community"
                        value={postForm.community}
                        onChange={postForm.handleChange}
                        placeholder="Enter the community ID"
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label htmlFor="postedBy" style={styles.label}>Your User ID</label>
                    <input
                        type="text"
                        id="postedBy"
                        name="postedBy"
                        value={postForm.postedBy}
                        onChange={postForm.handleChange}
                        placeholder="Enter your user ID"
                        required
                        style={styles.input}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={loading ? styles.buttonDisabled : styles.button}
                >
                    {loading ? "Submitting..." : "Create Post"}
                </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#343a40",
        fontSize: "24px",
        fontWeight: "600",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontWeight: "500",
        marginBottom: "5px",
        color: "#495057",
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ced4da",
        fontSize: "14px",
        transition: "border-color 0.2s",
    },
    textarea: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ced4da",
        fontSize: "14px",
        resize: "none",
        height: "80px",
        transition: "border-color 0.2s",
    },
    button: {
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        background: "#007bff",
        color: "#fff",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    buttonDisabled: {
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        background: "#6c757d",
        color: "#fff",
        fontWeight: "500",
        cursor: "not-allowed",
    },
    message: {
        textAlign: "center",
        marginTop: "20px",
        fontSize: "16px",
        fontWeight: "500",
        color: "#28a745",
    },
};

export default AddPost;
