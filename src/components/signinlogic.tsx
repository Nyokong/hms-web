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
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        student_number: '',
        password: '',
        password2: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // Check if username and student_number are the same
        if (formData.username !== formData.student_number) {
            setError('Username and student number do not match!');
            setSuccess('');
            return;
        }

        try {
            console.log(formData);

            const response = await axios.post(
                'http://127.0.0.1:8000/api/usr/create',
                formData,
            );
            if (response.status === 201) {
                setSuccess('Signup successful! Please log in.');
                setError('');
            }
        } catch (error) {
            setError(error.response.data.detail || 'Sign up failed!');
            setSuccess('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
        >
            <Label className="text-2xl font-bold text-purple-600 mb-8">
                Sign Up Here:
            </Label>
            <Input
                placeholder="first name"
                className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
            />
            <Input
                placeholder="Last name"
                className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
            />
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
                placeholder="student number"
                className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                name="student_number"
                value={formData.student_number}
                onChange={handleChange}
                required
            />
            <Input
                placeholder="Password"
                className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="password"
                name="password"
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
            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg mt-4 shadow-md transition duration-300 ease-in-out"
            >
                Sign Up
            </Button>

            {error && (
                <Alert className="text-black mt-5">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {success && (
                <Alert className="text-black mt-5">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}
        </form>
    );
};

export default signinlogic;
