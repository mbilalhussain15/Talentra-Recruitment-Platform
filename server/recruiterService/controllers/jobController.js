import Job from "../models/jobModel.js";

export const addJob = async (req, res) => {
  const userId = req.body.userId;
  console.log(req.body);
  const user = { userId: userId, type: "recruiter" };
  console.log(user);

  if (user.type !== "recruiter") {
    return res.status(401).json({ message: "Unauthorized to add jobs" });
  }

  try {
    const {
      jobTitle: title,
      tags,
      jobRole,
      minSalary,
      maxSalary,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      applyMethod,
      description,
      responsibilities,
      status = "Active",
    } = req.body;

    if (
      !title ||
      !tags ||
      !jobRole ||
      !minSalary ||
      !maxSalary ||
      !education ||
      !experience ||
      !jobType ||
      !vacancies ||
      !expirationDate ||
      !jobLevel ||
      !applyMethod ||
      !description ||
      !responsibilities
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const job = new Job({
      userId: user.userId,
      title,
      tags,
      jobRole,
      minSalary,
      maxSalary,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      applyMethod,
      description,
      responsibilities,
      status,
    });

    await job.save();
    res.json({ message: "Job added successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: error.message });
  }
};

export const updateJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedData = req.body;

    for (const key in updatedData) {
      if (updatedData[key] !== undefined) {
        job[key] = updatedData[key];
      }
    }

    await job.save();
    res.json({ message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();  
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobById = async (req, res) => {
  const jobId = req.params.jobId;
  console.log(jobId);
  console.log("param", req.params);
  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobsByRecruiterId = async (req, res) => {
  const recruiterId = req.params.recruiterId;

  try {
      const jobs = await Job.find({ userId: recruiterId });
      const jobCount = jobs.length;

      if (jobs.length === 0) {
          return res.status(404).json({ message: "No jobs found for this recruiter" });
      }

      res.status(200).json({ jobCount, jobs });

  } catch (error) {
      console.error("Error fetching jobs for recruiter:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchAllJobs = async () => {
  try {
    const jobs = await Job.find(); 
    return jobs;
  } catch (error) {
    throw new Error(error.message); 
  }
};

export const getAllJobs = async (req, res) => {
  try {
   
    const jobs = await fetchAllJobs();
    const jobCount = jobs.length;

    console.log("All jobs:", jobs);

    res.status(200).json({ jobCount, jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFilteredJobs = async (req, res) => {
  try {
    const { jobType, title } = req.query;

    const allJobs = await fetchAllJobs();

    console.log("All jobs:", allJobs);

    const filteredJobs = allJobs.filter(job => {
      const matchesJobType = !jobType || job.jobType === jobType;
      const matchesTitle = !title || job.title.toLowerCase().includes(title.toLowerCase());
      return matchesJobType && matchesTitle;
    });

    res.status(200).json(filteredJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopJobsByRecruiterId = async (req, res) => {
  const userId = req.params.userId;

  try {
    console.log("Fetching top jobs for recruiter:", userId);
    const totalJobs = await Job.countDocuments({ userId: userId });
    console.log("Total jobs found:", totalJobs);
    const jobs = await Job.find({ userId: userId })
      .sort({ 
        dateOfPosting: -1 }) 
      .limit(5); 
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this recruiter" });
    }

    res.status(200).json({ totalJobs, jobs });
  } catch (error) {
    console.error("Error fetching jobs for recruiter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





