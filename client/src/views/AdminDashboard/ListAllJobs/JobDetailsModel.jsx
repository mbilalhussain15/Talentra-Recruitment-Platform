import React from "react";
import { RxCross2 } from "react-icons/rx";

const JobDetailsModel = ({ isOpen, onClose, job }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000099] z-50">
      <div className="relative w-full max-w-xl h-[90%] p-10 bg-white rounded-2xl shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
        <p className="text-sm text-gray-600">
          {job.jobRole} - {job.jobLevel}
        </p>
        <p className="text-sm text-gray-600 mb-2">{job.jobType}</p>
        <div className="flex items-start w-full flex-wrap">
        <textarea className="text-gray-700 w-full outline-none mt-2 leading-relaxed">{job.description}</textarea>
        </div>

        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold text-gray-800">Education:</span>{" "}
            {job.education}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Experience:</span>{" "}
            {job.experience} years
          </p>
          <p>
            <span className="font-semibold text-gray-800">Salary:</span>{" "}
            <span className="text-green-600">
              ${job.minSalary} - ${job.maxSalary}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-800">Vacancies:</span>{" "}
            {job.vacancies}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Applicants:</span>{" "}
            {job.applicantCount}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Apply Method:</span>{" "}
            <span className="text-blue-600">{job.applyMethod}</span>
          </p>
          <p
            className={`font-semibold ${
              job.status === "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            Status: {job.status}
          </p>
        </div>

        <p className="mt-4 text-gray-500 text-sm">
          Posted on: {new Date(job.dateOfPosting).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">
          Expires on: {new Date(job.expirationDate).toLocaleDateString()}
        </p>

        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold text-gray-800">Responsibilities:</p>
          <textarea className="text-gray-700 w-full outline-none">{job.responsibilities}</textarea>
        </div>

        <div className="mt-4">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
            {job.tags}
          </span>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20">
          <RxCross2 size={30} color="#333" />
        </button>
      </div>
    </div>
  );
};

export default JobDetailsModel;
