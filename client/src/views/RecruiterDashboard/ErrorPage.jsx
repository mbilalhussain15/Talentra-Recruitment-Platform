import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPageImage from "../../assets/ErrorPageImage.png";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/recruiter/dashboard/plans-billing');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center mr-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Work in Progress...</h1>
        <p className="text-gray-600 mb-8">
          We are sorry! We try to make this site as soon as possible accessible.
        </p>
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
      <div>
        <img
          src={ErrorPageImage}
          alt="Woman fixing a robot"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
