import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate, Link } from "react-router-dom";
import { FaPlusCircle, FaEye } from "react-icons/fa";
import img1 from "../../assets/img1.webp";
import img2 from "../../assets/img2.webp";

const AdminDashboard = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold">Admin Dashboard</h1>
          <p className="text-lg mt-2 opacity-80">
            Welcome, Admin! Manage your dashboard effectively.
          </p>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative group">
            <img
              src={img1}
              alt="Opportunity"
              className="rounded-lg w-full h-full object-contain shadow-lg transition-transform transform group-hover:scale-105 duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-bold text-lg">Opportunities</p>
            </div>
          </div>

          <div className="relative group">
            <img
              src={img2}
              alt="Announcement"
              className="rounded-lg w-full h-full object-contain shadow-lg transition-transform transform group-hover:scale-105 duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-bold text-lg">Announcements</p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/create-opportunity"
            className="flex flex-col items-center p-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <FaPlusCircle className="text-5xl mb-4" />
            <h2 className="text-2xl font-semibold">Create Opportunity</h2>
            <p className="text-sm mt-2 opacity-90">
              Add a new opportunity for users.
            </p>
          </Link>

          <Link
            to="/view-opportunity"
            className="flex flex-col items-center p-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <FaEye className="text-5xl mb-4" />
            <h2 className="text-2xl font-semibold">View Opportunities</h2>
            <p className="text-sm mt-2 opacity-90">
              Browse all available opportunities.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
