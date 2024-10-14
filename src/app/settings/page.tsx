// pages/settings/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; // Adjust path to Navbar based on your structure

const SettingsPage = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save updated settings
    console.log('Settings Saved:', { username, email, password });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Settings Section */}
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

        <form onSubmit={handleSave} className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto">
          {/* Username */}
          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-lg font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
};

export default SettingsPage;
