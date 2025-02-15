import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
	{
		jobId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Applicant",
		},
		jobUserId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},

		status: {
			type: String,
			enum: ["applied", "shortlisted", "rejected"],
			default: "applied",
		},
		appliedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
