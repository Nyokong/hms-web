'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// import for cookies
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');

const signinlogic = () => {

        const [formData, setFormData] = useState({
          email: '',
          username: '',
          password1: '',
          password2: '',
        });
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');
      
        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup/', formData);
      
            if (response.status === 201) {
              setSuccess("Signup successful! Please log in.");
              setError('');
            }
          } catch (error) {
            setError(error.response.data.detail || "Sign up failed!");
            setSuccess('');
          }
        };
      
        return (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <Label className="text-2xl font-bold text-purple-600 mb-8">Sign Up Here:</Label>
            <Input
              placeholder="Email"
              className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Username"
              className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Password"
              className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              name="password1"
              value={formData.password1}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Confirm Password"
              className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg mt-4 shadow-md transition duration-300 ease-in-out">
                Sign Up
            </Button>

            {error && (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </form>
        );
      };

export default signinlogic;
