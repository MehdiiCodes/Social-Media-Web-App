'use client';
import { IconCheck, IconLoader3 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

const SignupSchema = Yup.object().shape({

  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is Required'),

  email: Yup.string()
    .email('Email is required')
    .required('Email is required'),

  password: Yup.string().required('Password is required')
    .matches(/[a-z]/, 'lowercase letter is required')
    .matches(/[A-Z]/, 'uppercase letter is required')
    .matches(/[0-9]/, 'number is required')
    .matches(/[\W]/, 'speical character is required')
    .min(8, 'minimum 8 characters is required'),

  confirmPassword: Yup.string().required('Password is Required')
    .oneOf([Yup.ref('password'), null], "Password dosen't match")
});

const Signup = () => {

  const router = useRouter();

  // initializing formik
  const signupForm = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    onSubmit: (values, { resetForm, setSubmitting }) => {

      console.log(values);

      // setTimeout(() => {
      //   resetForm();
      // }, 2000);/

      axios.post('http://localhost:5000/user/add', values)
        .then((response) => {
          console.log(response.status);
          resetForm();
          toast.success('User Registered Successfully');
          router.push('/login');
        }).catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || 'Semething went Wrong');
          setSubmitting(false);
        });

      // send values to backend
    },
    validationSchema: SignupSchema
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-white">
                Sign up
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Already have an account?{' '}
                <a
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                  href="../login"
                >
                  Sign in here
                </a>
              </p>
            </div>
            <button
              type="button"
              className="w-full py-3 px-4 flex justify-center items-center gap-3 text-sm font-medium rounded-lg border border-gray-600 bg-gray-700 text-white shadow-sm hover:bg-gray-600 transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              Sign up with Google
            </button>
            <div className="mt-6 mb-6 flex items-center justify-center text-sm text-gray-500">
              <div className="w-full border-t border-gray-600" />
              <div className="mx-4">Or</div>
              <div className="w-full border-t border-gray-600" />
            </div>
            <form onSubmit={signupForm.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.username}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                {signupForm.touched.username && signupForm.errors.username && (
                  <p className="mt-2 text-sm text-red-500">{signupForm.errors.username}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.email}
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                {signupForm.touched.email && signupForm.errors.email && (
                  <p className="mt-2 text-sm text-red-500">{signupForm.errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.password}
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                {signupForm.touched.password && signupForm.errors.password && (
                  <p className="mt-2 text-sm text-red-500">{signupForm.errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.confirmPassword}
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500">{signupForm.errors.confirmPassword}</p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  I accept the{" "}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                disabled={signupForm.isSubmitting}
                className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {signupForm.isSubmitting ? (
                  <IconLoader3 className="animate-spin mr-2" />
                ) : (
                  <IconCheck className="mr-2" />
                )}
                {signupForm.isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

