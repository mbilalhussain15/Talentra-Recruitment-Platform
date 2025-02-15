import Recruiter from "../models/recruiterModel.js";

export const createRecruiter = async (req, res) => {
    const { userId, name } = req.body;

    try {
        const newRecruiter = new Recruiter({ userId, name });
        await newRecruiter.save();

        res.status(201).json({
            message: "Recruiter created successfully",
            recruiter: newRecruiter,
        });
    } catch (error) {
        console.error("Error creating recruiter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getRecruiter = async (req, res) => {
    const { userId } = req.params;

    try {
        const recruiter = await Recruiter.findOne({ userId: userId });

        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }

        res.status(200).json(recruiter);
    } catch (error) {
        console.error("Error getting recruiter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateRecruiter = async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    try {
        const recruiter = await Recruiter.findOne({ userId });

        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }

        recruiter.name = name || recruiter.name;
        await recruiter.save();

        res.status(200).json({
            message: "Recruiter updated successfully",
            recruiter,
        });
    } catch (error) {
        console.error("Error updating recruiter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllRecruiters = async (req, res) => {
    try {
      const recruiters = await Recruiter.find().populate("userId", "-password");
      if (!recruiters) {
        return res.status(404).json({ message: "No recruiters found" });
      }
      res.json(recruiters);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error: " + err.message });
    }
  };