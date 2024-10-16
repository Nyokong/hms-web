'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Label } from '@radix-ui/react-label';

export default function updateuserdata() {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    });
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [hasPassword, setHasPassword] = useState(true);

    const access_token = getCookie('access_token');

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/usr/profile', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then(response => {
                const { username, first_name, last_name, has_password } =
                    response.data;
                setFormData(prevData => ({
                    ...prevData,
                    username: username || '',
                    first_name: first_name || '',
                    last_name: last_name || '',
                }));
                setHasPassword(has_password);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.put(
                'http://localhost:8000/api/usr/update',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                },
            );
            console.log('Profile updated:', response.data);
            // Handle post-update logic, e.g., showing a success message or redirecting
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error, e.g., showing an error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Label>Update My Information</Label>
            <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="m-2 p-3 border border-gray-300 rounded-3xl text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled
            />
            <Input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="m-2 p-3 border border-gray-300 rounded-3xl text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="m-2 p-3 border border-gray-300 rounded-3xl text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {showPasswordFields && (
                <>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="m-4 p-3 border border-gray-300 rounded-3xl text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <Input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="m-4 p-3 border border-gray-300 rounded-3xl text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </>
            )}
            {!hasPassword && !showPasswordFields && (
                <Button
                    onClick={() => setShowPasswordFields(true)}
                    className="mt-4 mx-4 bg-blue-700 text-white p-3 rounded-3xl hover:bg-blue-900"
                >
                    Create Password
                </Button>
            )}
            {hasPassword && (
                <p>
                    Already have a password?{' '}
                    <a
                        href="/reset-password"
                        className="text-blue-500 underline"
                    >
                        Reset Password
                    </a>
                </p>
            )}
            <Button
                type="submit"
                className="mt-4 bg-teal-800 text-white p-3 rounded-2g hover:bg-teal-950 "
            >
                Update My Profile
            </Button>
        </form>
    );
}
