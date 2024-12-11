'use client';

import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

const Login = () => {

  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((response) => {
          toast.success('User Login Successfully');
          localStorage.setItem('token', response.data.token);
          router.push('/');
        }).catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || 'Something went Wrong');
        });
    }
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-white">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Don't have an account?{' '}
                <a
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                  href="../signup"
                >
                  Sign up here
                </a>
              </p>
            </div>
            <button
              type="button"
              className="w-full py-3 px-4 flex justify-center items-center gap-3 text-sm font-medium rounded-lg border border-gray-600 bg-gray-700 text-white shadow-sm hover:bg-gray-600 transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </button>
            <div className="mt-6 mb-6 flex items-center justify-center text-sm text-gray-500">
              <div className="w-full border-t border-gray-600" />
              <div className="mx-4">Or</div>
              <div className="w-full border-t border-gray-600" />
            </div>
            <form onSubmit={loginForm.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineMail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.email}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg text-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockPasswordLine className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg text-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <a
                  href="../examples/html/recover-account.html"
                  className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;

