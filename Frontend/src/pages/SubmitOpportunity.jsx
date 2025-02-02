import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import detail from '../assets/detail.jpg';

const SubmitOpportunity = () => {
  const { _id } = useParams();  // Extract opportunity ID from URL params
  const [file, setFile] = useState(null);  // File state
  const [status, setStatus] = useState('');  // Status message state
  const [loading, setLoading] = useState(false);  // Track loading state

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('Please select a file to upload.');
      return;
    }

    setLoading(true);  // Start loading indicator
    setStatus('Processing your submission...');  // Update status message while loading

    const formData = new FormData();
    formData.append('image', file);  // Append file to FormData
    formData.append('opportunityId', _id);  // Append opportunity ID to FormData

    try {
      // Make API call to submit the file
      const response = await fetch('http://localhost:7000/api/submissions/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Use stored token
        },
        body: formData,  // Send file and opportunity ID
      });

      if (!response.ok) {
        throw new Error('Error uploading file.');
      }

      setStatus('Submission successful!');
    } catch (error) {
      setStatus('Error uploading file.');  // Show error message if submission fails
    } finally {
      setLoading(false);  // Stop loading indicator once request is complete

      // Remove the status message after 2 seconds
      setTimeout(() => {
        setStatus('');
      }, 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center transition duration-300 ease-in-out hover:bg-opacity-80"
      style={{
        backgroundImage: `url(${detail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'darken',
      }}
    >
      <div className="max-w-xl w-full p-8 bg-white shadow-lg rounded-lg bg-opacity-90">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Submit Your File
        </h1>

        {/* Alert Message */}
        {status && (
          <div
            className="fixed right-5 top-1/2 transform -translate-y-1/2 px-10 py-6 bg-white shadow-xl rounded-lg flex items-center gap-6 z-50"
          >
            {loading && (
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
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
                  d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                ></path>
              </svg>
            )}
            <span
              className={`text-lg font-semibold ${
                status.includes('successful')
                  ? 'text-green-600'
                  : status.includes('failed')
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {status}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Opportunity ID (Read-only) */}
          <div>
            <label
              htmlFor="opportunityId"
              className="block text-lg font-medium text-gray-700"
            >
              Opportunity ID:
            </label>
            <input
              type="text"
              id="opportunityId"
              value={_id}
              readOnly
              className="w-full mt-2 rounded-lg border-gray-300 bg-gray-100 p-3 text-gray-800 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="file"
              className="block text-lg font-medium text-gray-700"
            >
              Choose File:
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full mt-2 rounded-lg border border-gray-300 p-3 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 active:bg-blue-700 transition duration-300"
            disabled={loading}  // Disable the button while loading
          >
            {loading ? 'Submitting...' : 'Submit'} {/* Change text while loading */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitOpportunity;
