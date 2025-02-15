import axios from "axios";

import Job from "../models/jobModel.js"; 
import Application from "../models/applicationModel.js";
import mongoose from 'mongoose';

export const getJobApplications = async (req, res) => {

    const jobId = req.params.jobId;
    console.log("jobId =",jobId);
  
    try {

      const {data} = await axios.get(`http://localhost:5003/api/applicant/jobs/applicants/${jobId}`)
        
      const applicantCount = Array.isArray(data) ? data.length : 0;
      console.log("applicantCount =",applicantCount);

      await Job.findByIdAndUpdate(jobId, { applicantCount }, { new: true });

       console.log(data);
 
      res.status(200).json(data)

    } catch (error) {

      res.status(500).json({ error: error.message });
    }
  };

export const updateApplicationStatus = async (req, res) => {

  const userId = req.params.userId;
  const jobId = req.params.jobId;
  const { status } = req.body;
  console.log("Pooja userId =",userId);
  console.log("Pooja jobId =",jobId);
  console.log("Pooja param =",req.params);

  try {

    const {data:response} = await axios.put(`http://localhost:5003/api/applicant/applications/status/${userId}/${jobId}`,
   {
      status : status
   }
  );
    console.log(response);

    res.status(200).json(response)

  } catch (error) {
 
    res.status(500).json({ error: error.message });
  }
};

export const fetchAllShortlistedApplicants = async (jobUserId) => {
  
  console.log("f-userId =",jobUserId);
  try {

    const shortlistedApplicants = await Application.find({
      jobUserId: new mongoose.Types.ObjectId(jobUserId), 
      status: "Shortlisted" 
    }).populate('jobUserId'); 

    return shortlistedApplicants;
  } catch (error) {
    throw new Error(error.message); 
  }
};

export const getAllShortlistedApplicants01= async (req, res) => {
  try {
    
    const shortlistedApplicants = await fetchAllShortlistedApplicants();
    const applicantCount = shortlistedApplicants.length;

    const {data} = await axios.get(`http://localhost:5002/api/job/getAllJob`)
    const combinedResponse = {
      applicantCount,
      shortlistedApplicants,
      jobData: data 
    };

    res.status(200).json({ applicantCount, combinedResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllShortlistedApplicants02 = async (req, res) => {
  try {

    const shortlistedApplicants = await fetchAllShortlistedApplicants();
    const applicantCount = shortlistedApplicants.length;
   
    const { data } = await axios.get('http://localhost:5002/api/job/getAllJob');
    const { getAllApplicants } = await axios.get('http://localhost:5003/api/applicant/getAllApplicants');
    console.log("getAllApplicants =",getAllApplicants.data);

    const combinedApplicants = shortlistedApplicants.map(applicant => {
      
      const job = data.jobs.find(job => job._id.toString() === applicant.jobId.toString());
      const allApplicants = getAllApplicants.jobs.find(job => job._id.toString() === applicant.jobId.toString());
console.log("job =",job);
      if (job) {

        return {
          applicantId: applicant.userId,   // Applicant's userId
          jobTitle: job.title,              // Job title
          status: applicant.status,         // Applicant status
          appliedAt: applicant.appliedAt,   // Application date
          jobRole: job.jobRole,             // Job role
          minSalary: job.minSalary,         // Job's minimum salary
          maxSalary: job.maxSalary,         // Job's maximum salary
          education: job.education,         // Job's education requirement
          experience: job.experience,       // Job's experience requirement
          jobType: job.jobType,             // Job type (e.g., contract, part-time)
          vacancies: job.vacancies,         // Number of job vacancies
        };
      }

      return applicant; 
    });


    res.status(200).json({
      applicantCount,
      shortlistedApplicants: combinedApplicants
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllShortlistedApplicants = async (req, res) => {
  try {
    const jobUserId = req.params.jobUserId;

    console.log("s-userId:", req.params);

    const shortlistedApplicants = await fetchAllShortlistedApplicants(jobUserId);
    console.log("Shortlisted Applicants:", shortlistedApplicants);


    const { data } = await axios.get('http://localhost:5002/api/job/getAllJob');
    console.log("Fetched job data:", data);

    const getAllApplicants = await axios.get('http://localhost:5003/api/applicant/getAllApplicants');
    console.log("Fetched applicants data:", getAllApplicants.data);

    const applicantsMap = getAllApplicants.data.reduce((acc, applicant) => {
      acc[applicant.userId.toString()] = applicant;
      return acc;
    }, {});

    const jobsMap = data.jobs.reduce((acc, job) => {
      acc[job._id.toString()] = job;
      return acc;
    }, {});

    const combinedApplicants = shortlistedApplicants.map(applicant => {
      const jobIdString = applicant.jobId ? applicant.jobId.toString() : null;
      const userIdString = applicant.userId ? applicant.userId.toString() : null;

      const job = jobIdString ? jobsMap[jobIdString] : null;
      const applicantData = userIdString ? applicantsMap[userIdString] : null;

      console.log("applicantsMap:", applicantsMap);
      console.log("applicant:", applicant);
      console.log("applicant.userId:", applicant.userId);
      console.log("applicantData:", applicantData);


      return {
        _id: applicant._id,
        jobId: applicant.jobId,
        userId: applicant.userId,
        status: applicant.status,
        applicantName: applicantData ? applicantData.name : "Unknown",
        jobTitle: job ? job.title : "Unknown",
        jobRole: job ? job.jobRole : "Unknown",
        minSalary: job ? job.minSalary : null,
        maxSalary: job ? job.maxSalary : null,
        education: job ? job.education : "Unknown",
        experience: job ? job.experience : "Unknown",
        jobType: job ? job.jobType : "Unknown",
        vacancies: job ? job.vacancies : 0,
        expirationDate: job ? job.expirationDate : null,
        jobLevel: job ? job.jobLevel : "Unknown",
        applyMethod: job ? job.applyMethod : "Unknown",
        description: job ? job.description : "No description",
        appliedAt: applicant.appliedAt,
        createdAt: applicant.createdAt,
        updatedAt: applicant.updatedAt,
        __v: applicant.__v,
      };
    });

    res.status(200).json({
      applicantCount: shortlistedApplicants.length,
      shortlistedApplicants: combinedApplicants,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};







