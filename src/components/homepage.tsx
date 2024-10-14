// pages/index.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import CookiesPrompt from './cookiesPrompt';


const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Welcome Section */}
      <header className="bg-purple-800 text-white text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to the HMS Faculty Website</h1>
        <p className="text-lg">Helping lecturers provide better and faster feedback to their students.</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 text-black">

        {/* Features Section */}
        <section className="py-20 text-center shadow-lg bg-gray-100">
            <h2 className="text-4xl font-semibold mb-6 text-black">Features</h2>
            <div className="flex justify-center space-x-10">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-2 text-black">Real-time Feedback</h3>
                <p className="text-black">Lecturers can provide instant feedback to students with minimal effort.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-2 text-black">Personalized Insights</h3>
                <p className="text-black">Analyze student performance and give tailored advice.</p>
            </div>
            </div>
        </section>
        
      {/* About Us Section */}
        <section id = "about" className="py-20 text-center">
        <h2 className="text-4xl font-semibold mb-6 text-black">About Us</h2>
        <div className="bg-purple-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <p className="text-lg text-black">
            We are a group of passionate students working on a development project aimed at making education more efficient. 
            Our platform provides tools that allow lecturers to give real-time feedback and valuable insights to students, 
            improving the overall learning experience.
            </p>
        </div>
        
        {/* Our Mission Section */}
        <div className="mt-12 bg-purple-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-black">Our Mission</h3>
            <p className="text-lg text-black">
            Our mission is to create a user-friendly system that helps bridge the gap between lecturers and students, 
            providing faster, more effective feedback and fostering an engaging learning environment.
            </p>
        </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 NWU Human Movement Sciences</p>
      </footer>

      <CookiesPrompt/>
    </div>
  );
};

export default HomePage;

