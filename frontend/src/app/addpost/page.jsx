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
            image: '',
            postedBy: '',
            community: ''
        },
        onSubmit: (values, { resetForm, setSubmitting }) => {
            console.log(values);
            axios.post('http://localhost:5000/user/post', values)
                .then((result) => {
                    toast.success('Post Uploaded Successfully');
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
                    style={loading ? styles : styles.button}
                >
                    {loading ? "Uploading..." : "Create Post"}
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
        padding: "30px",
        fontFamily: "'Poppins', sans-serif",
        borderRadius: "15px",
        background: "linear-gradient(180deg, #e0f7fa, #ffffff)", // Pastel gradient background
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        animation: "fadeIn 0.5s",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
        fontSize: "34px",
        fontWeight: "700",
        textShadow: "1px 1px 1px rgba(255, 255, 255, 0.9)", // Softer text shadow
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontWeight: "600",
        marginBottom: "5px",
        color: "#555", // Soft gray for labels
    },
    input: {
        padding: "14px",
        borderRadius: "10px",
        border: "2px solid #b2ebf2",
        fontSize: "16px",
        transition: "border-color 0.3s, box-shadow 0.3s",
        outline: "none",
        backgroundColor: "#ffffff", // White background for inputs
    },
    inputFocus: {
        borderColor: "#80deea", // Light teal on focus
        boxShadow: "0 0 5px rgba(128, 222, 234, 0.5)", // Soft teal shadow on focus
    },
    textarea: {
        padding: "14px",
        borderRadius: "10px",
        border: "2px solid #b2ebf2",
        fontSize: "16px",
        resize: "none",
        height: "120px",
        transition: "border-color 0.3s, box-shadow 0.3s",
        outline: "none",
        backgroundColor: "#ffffff",
    },
    textareaFocus: {
        borderColor: "#80deea",
        boxShadow: "0 0 5px rgba(128, 222, 234, 0.5)",
    },
    button: {
        padding: "15px",
        border: "none",
        borderRadius: "10px",
        background: "#4db6ac", // Soft teal button
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.3s, transform 0.2s",
        fontSize: "16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
        background: "#26a69a", // Darker teal on hover
        transform: "scale(1.05)", // Slight grow on hover
    },
    buttonDisabled: {
        padding: "15px",
        border: "none",
        borderRadius: "10px",
        background: "#ccc",
        color: "#fff",
        fontWeight: "600",
        cursor: "not-allowed",
    },
    message: {
        textAlign: "center",
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "600",
        color: "#4db6ac", // Soft teal message color
    },
    errorMessage: {
        textAlign: "center",
        marginTop: "10px",
        fontSize: "16px",
        fontWeight: "600",
        color: "#f44336", // Red for error messages
    },
};

// Keyframes for fade-in animation
const fadeIn = `
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`;

export default AddPost;
