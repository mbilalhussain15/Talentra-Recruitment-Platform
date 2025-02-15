import mongoose from "mongoose";

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    minSalary: {
      type: Number,
      required: true,
    },
    maxSalary: {
      type: Number,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    vacancies: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    jobLevel: {
      type: String,
      required: true,
    },
    applyMethod: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: String,
      required: true,
    },
    dateOfPosting: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Active",
    },
    applicantCount: { 
      type: Number, 
      default: 0 
    },
  },
  { collation: { locale: "en" } }
);

export default mongoose.model("jobs", schema);