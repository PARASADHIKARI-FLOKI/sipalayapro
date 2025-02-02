import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserEdit,
  FaCalendarAlt,
  FaBriefcase,
  FaArrowRight,
  FaRocket,
  FaMedal,
  FaSuitcase,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import { IoIosShareAlt } from "react-icons/io"; // Import share icon

const OpportunityDetails = () => {
  const [opportunities, setOpportunities] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:7000/api/opportunities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpportunities(data);
        } else {
          console.error("Failed to fetch opportunities");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (!opportunities) return <p className="text-center text-lg text-gray-600">No opportunities available.</p>;

  const getBadgeDetails = (type) => {
    switch (type) {
      case "Hackathon":
        return { color: "bg-teal-500 text-white", icon: <FaRocket className="text-xl" /> };
      case "Quiz":
        return { color: "bg-pink-500 text-white", icon: <FaMedal className="text-xl" /> };
      case "Job":
        return { color: "bg-indigo-500 text-white", icon: <FaSuitcase className="text-xl" /> };
      case "Internship":
        return { color: "bg-amber-500 text-white", icon: <FaChalkboardTeacher className="text-xl" /> };
      case "Workshop":
        return { color: "bg-blue-500 text-white", icon: <FaBriefcase className="text-xl" /> };
      case "Conference":
        return { color: "bg-yellow-500 text-white", icon: <FaCalendarAlt className="text-xl" /> };
      default:
        return { color: "bg-gray-500 text-white", icon: <FaBriefcase className="text-xl" /> };
    }
  };

  const handleShareClick = (url) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this opportunity!",
        url: url,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Your browser does not support sharing.");
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-6"
      style={{
        background: "linear-gradient(to bottom, #f0f4ff, #d9e8ff, #c4dcff)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Opportunities
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-blue-700">
                  {opportunity.title}
                </h2>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full ${getBadgeDetails(opportunity.type).color}`}
                >
                  {getBadgeDetails(opportunity.type).icon} {opportunity.type}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{opportunity.description}</p>
              <div className="flex items-center mb-3">
                <FaBriefcase className="text-green-500 mr-2" />
                <span className="text-sm font-medium text-gray-600">
                  <strong>Type:</strong> {opportunity.type}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-red-500 mr-2" />
                <span className="text-sm font-medium text-gray-600">
                  <strong>Deadline:</strong>{" "}
                  {new Date(opportunity.deadline).toLocaleDateString()}
                </span>
              </div>

              {/* Social Share Icon */}
              <div className="flex gap-4 mt-4 justify-between items-center">
                {/* Edit Button */}
                {user?.role === "Admin" || user?.role === "Recruiter" ? (
                  <button
                    onClick={() => navigate(`/opportunity/${opportunity._id}/edit`)}
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-300"
                  >
                    Edit <FaUserEdit />
                  </button>
                ) : null}

                {/* Share Button */}
                <button
                  onClick={() => handleShareClick(`http://localhost:3000/opportunity/${opportunity._id}`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <IoIosShareAlt size={40} />
                </button>
              </div>

              {user?.role === "Participant" && (
                <button
                  onClick={() => navigate(`/submission/${opportunity._id}`)}
                  className="bg-blue-600 text-white w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300"
                >
                  Submit <FaArrowRight />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;
