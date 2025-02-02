import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateOpportunity = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Hackathon",
    deadline: "",
  });
  const [status, setStatus] = useState(""); // Status message state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:7000/api/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const responseData = await response.json();

      if (response.ok) {
        setStatus("Opportunity created successfully!");
        setTimeout(() => {
          setStatus("");
          navigate("/dashboard/admin");
        }, 2000); // Navigate after 2 seconds
      } else {
        setStatus("Failed to create opportunity.");
        console.error("Failed to create opportunity", responseData.message);
      }
    } catch (error) {
      setStatus("An error occurred.");
      console.error("Error:", error);
    } finally {
      setTimeout(() => setLoading(false), 2000); // Remove loading after 2 seconds
    }
  };

  return (
    <div
      className="relative min-h-screen p-6 flex justify-center items-center"
      style={{
        background: "linear-gradient(to bottom right, #e0f7fa, #80deea)",
      }}
    >
      {/* Status Alert */}
      {status && (
        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 p-4 rounded-lg shadow-lg bg-white text-center font-semibold text-lg"
          style={{
            color: status.includes("successfully") ? "green" : "red",
          }}
        >
          {status}
        </div>
      )}

      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Create Opportunity
        </h2>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the opportunity title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a brief description"
            rows="4"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Hackathon">Hackathon</option>
            <option value="Quiz">Quiz</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Deadline */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all flex justify-center items-center"
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {loading ? "Creating..." : "Create Opportunity"}
        </button>
      </form>
    </div>
  );
};

export default CreateOpportunity;
