import Application from "../models/applicationModel.js";
import axios from "axios";
import Applicant from "../models/applicantModel.js";
import multer from "multer";
import FavouriteJob from "../models/favouriteJobModel.js";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url"; // Import fileURLToPath from 'url' module
// import Job from "../models/applicantJobModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const getAllApplicants = async (req, res) => {
	try {
		const applicants = await Applicant.find().select("-password"); // Exclude password field
		res.status(200).json(applicants);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const createApplicant = async (req, res) => {
	const { userId, name, education, skills, resume, profile } = req.body;
	try {
		const newApplicant = new Applicant({
			userId,
			name,
			education: education || [],
			skills: skills || [],
			resume: resume || "",
			profile: profile || "",
		});

		await newApplicant.save();
		res.status(201).json(newApplicant);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getApplicantById = async (req, res) => {
	try {
		const { userId } = req.params;
		console.log("userId", userId);
		const applicant = await Applicant.findOne({ userId }).select("-password"); // Exclude password field

		if (!applicant) {
			return res.status(404).json({ message: "Applicant not found" });
		}

		res.status(200).json(applicant);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const getApplicantByUserId = async (req, res) => {
	try {
		const applicant = await Applicant.findOne({ userId: req.params.userId });
		if (!applicant) {
			return res.status(404).json({ message: "Applicant not found" });
		}
		res.json(applicant);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// const updateApplicant = async (req, res) => {
// 	try {
// 		const { userId } = req.params;
// 		const updateData = req.body;

// 		const updatedApplicant = await Applicant.findOneAndUpdate(
// 			userId,
// 			updateData,
// 			{
// 				new: true,
// 				runValidators: true,
// 			}
// 		).select("-password"); // Exclude password field

// 		if (!updatedApplicant) {
// 			return res.status(404).json({ message: "Applicant not found" });
// 		}

// 		res.status(200).json(updatedApplicant);
// 	} catch (error) {
// 		res.status(500).json({ message: "Server error", error: error.message });
// 	}
// };

const updateApplicant = async (req, res) => {
	try {
		const updateData = req.body;
		console.log("Received data ===>", updateData);

		// If resume is being updated and is provided as a file
		if (req.file) {
			updateData.resume = req.file.buffer;
		}

		const updatedApplicant = await Applicant.findOneAndUpdate(
			{ userId: req.params.userId },
			{ $set: updateData },
			{ new: true, runValidators: true }
		);

		if (!updatedApplicant) {
			return res.status(404).json({ message: "Applicant not found" });
		}

		res.json(updatedApplicant);
	} catch (error) {
		console.error("Error updating applicant:", error);
		res.status(500).json({ message: error.message });
	}
};

const applyForJob = async (req, res) => {
	try {
		// console.log("Inside applyForJob");
		const { userId, jobUserId, jobId } = req.body;
		// console.log("userId:", userId, " jobId:", jobId);
		console.log("jobUserId= ", jobUserId);
		console.log("creating new application");
		// Create a new application
		const application = new Application({
			userId,
			jobId,
			jobUserId,
			status: "applied",
			appliedAt: new Date(),
		});
		console.log("saving application= ", application);
		// Save the application
		await application.save();

		// Fetch the applicant details using userId
		let applicant;
		try {
			const applicantResponse = await axios.get(
				`http://localhost:5003/api/applicant/getApplicantById/${userId}`
			);
			applicant = applicantResponse.data;
		} catch (error) {
			console.error("Error fetching applicant details:", error);
			return res
				.status(404)
				.json({ message: "Applicant not found", error: error.message });
		}

		// Fetch job details using jobId
		let job;
		try {
			const jobResponse = await axios.get(
				`http://localhost:5002/api/job/getJobByID/${jobId}`
			);
			job = jobResponse.data;
		} catch (error) {
			console.error("Error fetching job details:", error);
			return res
				.status(404)
				.json({ message: "Job not found", error: error.message });
		}
		console.log("application.userId= ", application.userId);
		// Format the response
		const formattedResponse = {
			title: job.title,
			count: 1,
			applicants: [
				{
					_id: application._id,
					jobId: application.jobId,
					userId: application.userId,
					name: applicant.name,
					status: application.status,
					jobRole: job.jobRole,
					minSalary: job.minSalary,
					maxSalary: job.maxSalary,
					education: job.education,
					experience: job.experience,
					jobType: job.jobType,
					vacancies: job.vacancies,
					expirationDate: job.expirationDate,
					jobLevel: job.jobLevel,
					description: job.description,
					appliedAt: application.appliedAt,
					applied: new Date(application.appliedAt).toLocaleDateString("en-US", {
						month: "short",
						day: "2-digit",
						year: "numeric",
					}),
					createdAt: application.createdAt,
					updatedAt: application.updatedAt,
				},
			],
		};

		res.status(201).json([formattedResponse]);
	} catch (error) {
		console.error("Error in applyForJob:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const fetchFilteredJobs = async (req, res) => {
	try {
		const { jobType, minSalary, maxSalary, title } = req.query;

		// Convert salary values to numbers
		const numericMinSalary = minSalary ? Number(minSalary) : null;
		const numericMaxSalary = maxSalary ? Number(maxSalary) : null;

		const response = await axios.get("http://localhost:5002/api/job/getAllJob");
		const allJobs = response.data;

		// Filter jobs correctly
		const filteredJobs = allJobs.jobs.filter((job) => {
			const matchesJobType = !jobType || job.jobType === jobType;
			const matchesMinSalary = !numericMinSalary || job.minSalary >= numericMinSalary;
			const matchesMaxSalary = !numericMaxSalary || job.maxSalary <= numericMaxSalary;
			const matchesTitle = !title || job.title.toLowerCase().includes(title.toLowerCase());

			return matchesJobType && matchesMinSalary && matchesMaxSalary && matchesTitle;
		});

		res.status(200).json(filteredJobs);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};




const fetchJobs = async (req, res) => {
	try {
		const response = await axios.get("http://localhost:5002/api/job/getAllJob");
		const jobs = response.data;
		res.json(jobs);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getJobsAppliedByApplicant = async (req, res) => {
	try {
		const { userId } = req.params;
		console.log("userId:", userId);

		// Fetch all applications for the applicant
		const applications = await Application.find({ userId });

		if (!applications.length) {
			return res
				.status(404)
				.json({ message: "No applications found for this applicant" });
		}

		// Fetch the applicant details using userId
		let applicant;
		try {
			const applicantResponse = await axios.get(
				`http://localhost:5003/api/applicant/getApplicantById/${userId}`
			);
			applicant = applicantResponse.data;
		} catch (error) {
			console.error("Error fetching applicant details:", error);
			return res
				.status(404)
				.json({ message: "Applicant not found", error: error.message });
		}

		// Fetch job details for each application and format the response
		const formattedResponses = await Promise.all(
			applications.map(async (application) => {
				let job;
				try {
					const jobResponse = await axios.get(
						`http://localhost:5002/api/job/getJobByID/${application.jobId}`
					);
					job = jobResponse.data;
				} catch (error) {
					console.error("Error fetching job details:", error);
					return null;
				}

				return {
					title: job.title,
					count: 1,
					applicants: [
						{
							_id: application._id,
							jobId: application.jobId,
							name: applicant.name,
							status: application.status,
							jobRole: job.jobRole,
							minSalary: job.minSalary,
							maxSalary: job.maxSalary,
							education: job.education,
							experience: job.experience,
							jobType: job.jobType,
							vacancies: job.vacancies,
							expirationDate: job.expirationDate,
							jobLevel: job.jobLevel,
							description: job.description,
							appliedAt: application.appliedAt,
							applied: new Date(application.appliedAt).toLocaleDateString(
								"en-US",
								{
									month: "short",
									day: "2-digit",
									year: "numeric",
								}
							),
							createdAt: application.createdAt,
							updatedAt: application.updatedAt,
						},
					],
				};
			})
		);

		// Filter out any null responses (in case of errors fetching job details)
		const validResponses = formattedResponses.filter(
			(response) => response !== null
		);

		res.status(200).json(validResponses);
	} catch (error) {
		console.error("Error in getJobsAppliedByApplicant:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const getApplicantsForJob = async (req, res) => {
	try {
		const { jobId } = req.params;
		console.log("jobId:", jobId);

		// Fetch all applications for the job
		const applications = await Application.find({ jobId });
		console.log("applications:", applications);

		if (!applications.length) {
			return res
				.status(404)
				.json({ message: "No applications found for this job" });
		}

		// Fetch job details using jobId
		let job;
		try {
			const jobResponse = await axios.get(
				`http://localhost:5002/api/job/getJobByID/${jobId}`
			);
			job = jobResponse.data;
		} catch (error) {
			console.error("Error fetching job details:", error);
			return res
				.status(404)
				.json({ message: "Job not found", error: error.message });
		}

		// Fetch applicant details for each application and format the response
		const formattedResponses = await Promise.all(
			applications.map(async (application) => {
				let applicant;
				try {
					const applicantResponse = await axios.get(
						`http://localhost:5003/api/applicant/getApplicantById/${application.userId}`
					);
					applicant = applicantResponse.data;
				} catch (error) {
					console.error("Error fetching applicant details:", error);
					return null;
				}

				return {
					title: job.title,
					count: 1,
					applicants: [
						{
							_id: application._id,
							jobId: application.jobId,
							userId: application.userId,
							name: applicant.name,
							status: application.status,
							jobRole: job.jobRole,
							title: job.title,
							minSalary: job.minSalary,
							maxSalary: job.maxSalary,
							education: job.education,
							experience: job.experience,
							jobType: job.jobType,
							vacancies: job.vacancies,
							expirationDate: job.expirationDate,
							jobLevel: job.jobLevel,
							description: job.description,
							responsibilities: job.responsibilities,
							appliedAt: application.appliedAt,
							applied: new Date(application.appliedAt).toLocaleDateString(
								"en-US",
								{
									month: "short",
									day: "2-digit",
									year: "numeric",
								}
							),
							createdAt: application.createdAt,
							updatedAt: application.updatedAt,
						},
					],
					applicantDetails: applicant, // Append applicant details
				};
			})
		);

		// Filter out any null responses (in case of errors fetching applicant details)
		const validResponses = formattedResponses.filter(
			(response) => response !== null
		);

		res.status(200).json(validResponses);
	} catch (error) {
		console.error("Error in getApplicantsForJob:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const updateApplicationStatus = async (req, res) => {
	try {
		const { userId } = req.params; // Extract applicationId from URL parameters
		const { jobId } = req.params;
		const { status } = req.body; // Extract status from request body\

		// Validate the status
		const validStatuses = ["Accept", "Shortlisted", "Rejected", "Unknown"];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({ message: "Invalid status" });
		}

		// Find the application by userId and update its status
		const updatedApplication = await Application.findOneAndUpdate(
			{ userId, jobId },
			{ status },
			{ new: true } // Return the updated document
		);

		if (!updatedApplication) {
			return res.status(404).json({ message: "Application not found" });
		}

		res.status(200).json(updatedApplication);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const uploadResume2 = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!req.file || req.file.mimetype !== "application/pdf") {
			return res.status(400).json({ message: "Please upload a PDF file" });
		}

		// Get the current directory path using import.meta.url
		const __filename = fileURLToPath(import.meta.url); // Get the filename
		const __dirname = path.dirname(__filename); // Get the directory name

		// Generate a unique file name using userId and UUID to ensure uniqueness
		const fileName = `${userId}-${uuidv4()}.pdf`; // File name now includes userId
		const filePath = path.join(__dirname, "..", "uploads", "resumes", fileName); // Path where the file will be stored

		// Write the file to the uploads directory
		fs.writeFileSync(filePath, req.file.buffer);

		// Construct the file URL using the userId
		const fileUrl = `/uploads/resumes/${fileName}`;

		// Update the applicant's document with the file URL
		const updatedApplicant = await Applicant.findOneAndUpdate(
			{ userId },
			{ resume: fileUrl }, // Save the file URL in the 'resume' field
			{ new: true, runValidators: true }
		);

		if (!updatedApplicant) {
			return res.status(404).json({ message: "Applicant not found" });
		}

		// Send back the updated applicant with the resume URL
		res.status(200).json(updatedApplicant);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const uploadResume = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!req.file || req.file.mimetype !== "application/pdf") {
			return res.status(400).json({ message: "Please upload a PDF file" });
		}

		// Get the current directory path using import.meta.url
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		// Define the directory where resumes will be stored
		const resumesDir = path.join(__dirname, "..", "uploads", "resumes");

		// Ensure the "uploads/resumes" directory exists
		if (!fs.existsSync(resumesDir)) {
			fs.mkdirSync(resumesDir, { recursive: true });
		}

		// Generate a unique file name using userId and UUID
		const fileName = `${userId}-${uuidv4()}.pdf`;
		const filePath = path.join(resumesDir, fileName);

		// Write the file to the uploads directory
		fs.writeFileSync(filePath, req.file.buffer);

		// Construct the file URL using the userId
		const fileUrl = `/uploads/resumes/${fileName}`;

		// Update the applicant's document with the file URL
		const updatedApplicant = await Applicant.findOneAndUpdate(
			{ userId },
			{ resume: fileUrl },
			{ new: true, runValidators: true }
		);

		if (!updatedApplicant) {
			return res.status(404).json({ message: "Applicant not found" });
		}

		// Send back the updated applicant with the resume URL
		res.status(200).json(updatedApplicant);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const uploadResume1 = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!req.file || req.file.mimetype !== "application/pdf") {
			return res.status(400).json({ message: "Please upload a PDF file" });
		}

		const updatedApplicant = await Applicant.findOneAndUpdate(
			{ userId },
			{ resume: req.file.buffer },
			{ new: true, runValidators: true }
		);

		if (!updatedApplicant) {
			return res.status(404).json({ message: "Applicant not found" });
		}

		res.status(200).json(updatedApplicant);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const fetchResume = async (req, res) => {
	try {
		const { userId } = req.params;

		// Find the applicant by userId and retrieve the resume URL
		const applicant = await Applicant.findOne({ userId }).select("resume");

		if (!applicant || !applicant.resume) {
			return res.status(404).json({ message: "Resume not found" });
		}

		// Get the current directory path using import.meta.url
		const __filename = fileURLToPath(import.meta.url); // Get the filename
		const __dirname = path.dirname(__filename); // Get the directory name

		// Construct the file path based on the resume URL saved in the database
		const resumePath = path.join(
			__dirname,
			"..",
			"uploads",
			"resumes",
			applicant.resume.split("/uploads/resumes/")[1]
		);

		// Check if the file exists
		if (!fs.existsSync(resumePath)) {
			return res.status(404).json({ message: "Resume file not found" });
		}

		// Set the content type and send the resume file
		res.set("Content-Type", "application/pdf");
		res.sendFile(resumePath); // Sends the PDF file to the client
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const addFavouriteJob = async (req, res) => {
	const { jobId, userId } = req.body;
	// const userId = req.user._id;

	try {
		const favouriteJob = new FavouriteJob({ userId, jobId });
		await favouriteJob.save();
		res.status(201).json(favouriteJob);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const fetchFavouriteJobs = async (req, res) => {
	// const userId = req.user._id;
	const { userId } = req.params;

	try {
		const favouriteJobs = await FavouriteJob.find({ userId });
		res.status(200).json(favouriteJobs);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export {
	getAllApplicants,
	createApplicant,
	updateApplicant,
	getApplicantByUserId,
	fetchJobs,
	applyForJob,
	getApplicantsForJob,
	updateApplicationStatus,
	fetchFilteredJobs,
	getJobsAppliedByApplicant,
	uploadResume,
	fetchResume,
	addFavouriteJob,
	fetchFavouriteJobs,
};
