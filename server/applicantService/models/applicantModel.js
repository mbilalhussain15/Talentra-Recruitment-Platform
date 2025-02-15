import mongoose, { Mongoose } from "mongoose";

const applicantSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		skills: {
			type: [String],
			required: true,
		},
		resume: {
			type: String,
		},
		education: {
			type: [String],
		},
	},
	{
		timestamps: true,
	}
);

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;
