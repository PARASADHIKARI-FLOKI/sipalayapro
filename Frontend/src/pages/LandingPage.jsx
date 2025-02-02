import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/backgroundImage.webp";

const LandingPage = () => {
  const { user } = useContext(UserContext);

  const featuredTopic = {
    title: "Upcoming Hackathon: Code Sprint 2025",
    description:
      "Join the ultimate coding challenge of the year! Compete, collaborate, and win exciting prizes.",
    date: "Feb 25, 2025",
  };

  return (
    <div
      id="image3"
      className="relative min-h-screen flex flex-col items-center justify-center text-gray-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Smooth parallax effect
      }}
    >
      {/* Featured Topic Banner */}
      <div className="w-full bg-blue-500 text-white py-4 px-6 text-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-300">
          {featuredTopic.title}
        </h2>
        <p className="text-lg md:text-xl mt-1 text-gray-200">
          {featuredTopic.description}
        </p>
        <p className="text-sm md:text-md mt-1 text-gray-300">
          Event Date: <span className="font-semibold text-white">{featuredTopic.date}</span>
        </p>
      </div>

      {/* Welcome Section */}
      <div className="text-center mt-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide leading-tight text-indigo-300">
          Welcome to <span className="text-yellow-300">SKILL EDUCATION</span>
        </h1>
        <p className="mb-8 text-lg md:text-2xl max-w-3xl leading-relaxed tracking-wide text-gray-200 hover:text-indigo-200 transition-colors">
          Participate in Hackathons, Quizzes, Internships, and Job Opportunities!
        </p>
      </div>

      {user ? (
        <div className="p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <p className="text-xl font-semibold text-gray-800">
            Hello, <span className="text-red-600">{user.name}</span>! 🎉
          </p>
        </div>
      ) : (
        <div className="space-x-4 mt-6">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-all duration-300 ease-in-out text-lg font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 shadow-md transition-all duration-300 ease-in-out text-lg font-medium"
          >
            Register
          </Link>
        </div>
      )}

      {/* Background Cards Section */}
      <div className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-bold text-blue-600">Hackathons</h3>
            <p className="text-gray-700 mt-2">
              Join exciting coding competitions and showcase your skills.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-purple-50 transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-bold text-purple-600">Quizzes</h3>
            <p className="text-gray-700 mt-2">
              Participate in quizzes to test your knowledge and win rewards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-yellow-50 transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-bold text-yellow-600">Internships</h3>
            <p className="text-gray-700 mt-2">
              Find internships to kickstart your career with top companies.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-green-50 transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-bold text-green-600">Job Openings</h3>
            <p className="text-gray-700 mt-2">
              Explore job openings and land your dream job.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-bold text-indigo-600">Workshops</h3>
            <p className="text-gray-700 mt-2">
              Attend workshops to learn new skills and grow professionally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
