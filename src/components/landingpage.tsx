'use client';

import React from 'react';
import Headerlinks from './headerlinks';
import Navbar from './navbar';
import Header from './header';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Welcome to NWU Human Movement Sciences Faculty
                </h1>
                <p className="text-xl mb-8">
                    Providing faster and better feedback to students
                </p>
                <button className="bg-white text-blue-500 font-bold py-3 px-6 rounded-full hover:bg-gray-100">
                    Get Started
                </button>
            </section>

            {/* Features Section */}
            <section className="py-20 text-center">
                <h2 className="text-4xl font-semibold mb-6">Features</h2>
                <div className="flex justify-center space-x-10">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-2">
                            Real-time Feedback
                        </h3>
                        <p className="text-gray-600">
                            Lecturers can provide instant feedback to students
                            with minimal effort.
                        </p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-2">
                            Personalized Insights
                        </h3>
                        <p className="text-gray-600">
                            Analyze student performance and give tailored
                            advice.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 text-center">
                <p>&copy; 2024 NWU Human Movement Sciences</p>
            </footer>
        </div>
    );
};

export default LandingPage;
