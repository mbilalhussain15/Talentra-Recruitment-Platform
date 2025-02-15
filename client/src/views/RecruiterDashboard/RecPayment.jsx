import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentImage from "../../assets/PaymentImage.png";

const RecPayment = () => {
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    navigate('/recruiter/dashboard/error');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-blue-600">Maximize Your Hiring Potential with Tailored Job Posting Plans</h1>
          <p className="text-gray-600 mt-2">
            Take your recruitment strategy to the next level with our flexible subscription plans designed to meet your hiring needs. 
            Whether you're looking to post a single job or manage multiple listings with added visibility and premium support, we have the perfect plan for you.
          </p>
        </div>
        <div className="flex-shrink-0">
          <img src={PaymentImage} alt="Illustration" className="w-120 h-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <div className="border rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-600">BASIC</h2>
          <p className="text-gray-500 mb-4">Ideal for single job postings with essential features like urgent and highlighted jobs</p>
          <p className="text-2xl font-bold mb-4 text-blue-600">$19 <span className="text-base font-medium">/Monthly</span></p>
          <ul className="text-sm space-y-2 mb-6 text-blue-600">
            <li>✔ Post 1 Job</li>
            <li>✔ Urgents & Featured Jobs</li>
            <li>✔ Highlights Job with Colors</li>
            <li>✔ Access & Saved 5 Candidates</li>
            <li>✔ 10 Days Resume Visibility</li>
            <li>✔ 24/7 Critical Support</li>
          </ul>
          <button
            onClick={handleChoosePlan}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
          >
            Choose Plan <span className="ml-2">→</span>
          </button>
        </div>

        {/* Standard Plan */}
        <div className="border rounded-lg shadow-lg p-6 bg-blue-50">
          <h2 className="text-xl font-bold mb-2 text-blue-600">STANDARD (Most Popular)</h2>
          <p className="text-gray-500 mb-4">Perfect for small to medium-scale hiring, offering 3 active job slots and expanded candidate access</p>
          <p className="text-2xl font-bold mb-4 text-blue-600">$39 <span className="text-base font-medium">/Monthly</span></p>
          <ul className="text-sm space-y-2 mb-6 text-blue-600">
            <li>✔ 3 Active Jobs</li>
            <li>✔ Urgents & Featured Jobs</li>
            <li>✔ Highlights Job with Colors</li>
            <li>✔ Access & Saved 10 Candidates</li>
            <li>✔ 20 Days Resume Visibility</li>
            <li>✔ 24/7 Critical Support</li>
          </ul>
          <button
            onClick={handleChoosePlan}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
          >
            Choose Plan <span className="ml-2">→</span>
          </button>
        </div>

        {/* Premium Plan */}
        <div className="border rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-600">PREMIUM</h2>
          <p className="text-gray-500 mb-4">Best for larger hiring needs, with active jobs, enhanced visibility, and extended resume access</p>
          <p className="text-2xl font-bold mb-4 text-blue-600">$59 <span className="text-base font-medium">/Monthly</span></p>
          <ul className="text-sm space-y-2 mb-6 text-blue-600">
            <li>✔ 6 Active Jobs</li>
            <li>✔ Urgents & Featured Jobs</li>
            <li>✔ Highlights Job with Colors</li>
            <li>✔ Access & Saved 20 Candidates</li>
            <li>✔ 30 Days Resume Visibility</li>
            <li>✔ 24/7 Critical Support</li>
          </ul>
          <button
            onClick={handleChoosePlan}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
          >
            Choose Plan <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecPayment;
