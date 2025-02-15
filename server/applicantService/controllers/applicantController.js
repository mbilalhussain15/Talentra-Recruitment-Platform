import Applicant from "../models/applicantModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @desc    Get applicant by user ID
// @route   GET /api/applicants/:userId
// @access  Public
export const getApplicantByUserId = async (req, res) => {
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

// @desc    Update applicant
// @route   PUT /api/applicants/:userId
// @access  Public
export const old = async (req, res) => {
	try {
		const { name, skills, education } = req.body;
		let resume = req.body.resume;

		if (req.file) {
			resume = req.file.buffer;
		}

		const parsedEducation = JSON.parse(education).map((edu) => ({
			...edu,
			startYear: new Date(edu.startYear),
			endYear: new Date(edu.endYear),
		}));

		const updatedApplicant = await Applicant.findOneAndUpdate(
			{ userId: req.params.userId },
			{
				name,
				skills: Array.isArray(skills) ? skills : JSON.parse(skills),
				resume,
				education: parsedEducation,
			},
			{ new: true }
		);

		if (!updatedApplicant) {
			return res.status(404).json({ message: "Applicant not found" });
		}

		res.json(updatedApplicant);
	} catch (error) {
		console.error("Error updating applicant:", error); // Add this line
		res.status(500).json({ message: error.message });
	}
};



export const updateApplicant = async (req, res) => {
	try {
	  const updateData = req.body;
	  console.log("Received data ===>", updateData);
  
	  // If resume is being updated and is provided as a file
	  if (req.file) {
		updateData.resume = req.file.buffer;
	  }
  
	  // If education is provided, parse it. Else, skip.
	  if (updateData.education) {
		try {
		  updateData.education = JSON.parse(updateData.education).map((edu) => ({
			...edu,
			startYear: new Date(edu.startYear),
			endYear: new Date(edu.endYear),
		  }));
		} catch (err) {
		  console.error("Error parsing education:", err);
		  return res.status(400).json({ message: "Invalid education data" });
		}
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
  








export const updateApplicant02 = async (req, res) => {
	try {
		const updateData = req.body;
		console.log("req.body ===>", req.body);
		console.log("Recieved data ===>", updateData);

		// If resume is being updated and is provided as a file
		if (req.file) {
			updateData.resume = req.file.buffer;
		}

		//If education is provided as a JSON string, parse it
		if (updateData.education) {
			updateData.education = JSON.parse(updateData.education).map((edu) => ({
				...edu,
				startYear: new Date(edu.startYear),
				endYear: new Date(edu.endYear),
			}));
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

export const updateApplicant1 = async (req, res) => {
	const { userId } = req.params;
	const { name, skills, education } = req.body;

	try {
		const applicant = await Applicant.findOne({ userId });

		if (!applicant) {
			return res.status(404).json({ message: "Applicant not found" });
		}

		// Update fields if provided
		applicant.name = name || applicant.name;
		applicant.skills = skills ? JSON.parse(skills) : applicant.skills;
		applicant.education = education
			? JSON.parse(education).map((edu) => ({
					...edu,
					startYear: new Date(edu.startYear),
					endYear: new Date(edu.endYear),
			  }))
			: applicant.education;

		// If resume is being updated and is provided as a file
		if (req.file) {
			applicant.resume = req.file.buffer;
		}

		await applicant.save();

		res.status(200).json({
			message: "Applicant updated successfully",
			applicant,
		});
	} catch (error) {
		console.error("Error updating applicant:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// @desc    Fetch resume
// @route   GET /api/applicants/fetchResume/:applicantId
// @access  Public
export const fetchResume = async (req, res) => {
	try {
		const { applicantId } = req.params;

		const applicant = await Applicant.findById(applicantId).select("resume");

		if (!applicant || !applicant.resume) {
			return res.status(404).json({ message: "Resume not found" });
		}

		res.set("Content-Type", "application/pdf");
		res.send(applicant.resume);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
