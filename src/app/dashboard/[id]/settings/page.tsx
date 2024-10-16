'use client';

import React, { Suspense, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/app/loading';
import Viewsubmissions from '@/components/viewsubmissions';
import { getCookie } from 'cookies-next';

export default function Settings() {
    const { id } = useParams();
    const router = useRouter();

    const accessToken = getCookie('access_token');

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [courses, setCourses] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState('userPreferences'); // Default tab

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        document.body.classList.toggle('dark', !isDarkMode);
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const addCourse = () => {
        const courseName = prompt('Enter course name:');
        if (courseName) {
            setCourses(prevCourses => [...prevCourses, courseName]);
        }
    };

    if (!accessToken) {
        // If there's no access token, do nothing
        return router.push('/');
    }
    if (!getCookie('loggedin')) {
        const logged = setTimeout(() => {
            if (!getCookie('loggedin')) {
                const logged = setTimeout(() => {
                    return router.push('/');
                }, 1000);
            }
        }, 5000);
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'userPreferences':
                return (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">
                            User Preferences
                        </h2>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                                className="mr-2"
                            />
                            Dark Mode
                        </label>
                    </div>
                );
            case 'profile':
                return (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">User Profile</h2>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            placeholder="Name"
                            className="mt-2 p-2 border rounded w-full"
                        />
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            placeholder="Email"
                            className="mt-2 p-2 border rounded w-full"
                        />
                    </div>
                );
            case 'password':
                return (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">
                            Reset Password
                        </h2>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="mt-2 p-2 border rounded w-full"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="mt-2 p-2 border rounded w-full"
                        />
                        <button className="mt-2 p-2 bg-purple-600 text-white rounded">
                            Reset Password
                        </button>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">
                            Notification Preferences
                        </h2>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Email Notifications
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            SMS Notifications
                        </label>
                    </div>
                );
            case 'courses':
                return (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">
                            Course Management
                        </h2>
                        <button
                            onClick={addCourse}
                            className="mt-2 p-2 bg-purple-600 text-white rounded"
                        >
                            Add Course
                        </button>
                        <h3 className="mt-2">Current Courses:</h3>
                        <ul>
                            {courses.map((course, index) => (
                                <li key={index} className="mt-1">
                                    {course}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <div>
                    <Link
                        href={`/dashboard/${id}/`}
                        className="flex shrink-0 items-center justify-center gap-2  bg-transparent text-white md:text-base"
                    >
                        Go Back
                    </Link>
                </div>
                <div
                    className={`flex ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                >
                    {/* Vertical Tabs */}
                    <div className="w-1/4 p-4 bg-purple-500 text-white">
                        <h1 className="text-2xl font-bold mb-4">Settings</h1>
                        <button
                            onClick={() => setActiveTab('userPreferences')}
                            className={`block p-2 mb-2 rounded ${activeTab === 'userPreferences' ? 'bg-purple-700' : ''}`}
                        >
                            User Preferences
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`block p-2 mb-2 rounded ${activeTab === 'profile' ? 'bg-purple-700' : ''}`}
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`block p-2 mb-2 rounded ${activeTab === 'password' ? 'bg-purple-700' : ''}`}
                        >
                            Reset Password
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`block p-2 mb-2 rounded ${activeTab === 'notifications' ? 'bg-purple-700' : ''}`}
                        >
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`block p-2 mb-2 rounded ${activeTab === 'courses' ? 'bg-purple-700' : ''}`}
                        >
                            Courses
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="w-3/4 p-4">{renderContent()}</div>
                </div>
            </Suspense>
        </div>
    );
}
