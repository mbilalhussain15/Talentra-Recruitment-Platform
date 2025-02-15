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
    maxApplicants: {
      type: Number,
    },
    maxPositions: {
      type: Number,
    },
    activeApplications: {
      type: Number,
      default: 0,
    },
    acceptedCandidates: {
      type: Number,
      default: 0,
    },
    dateOfPosting: {
      type: Date,
      default: Date.now,
    },
    deadline: {type: Date,},
    skillsets: [String],
    jobType: {type: String,required: true,
    },
    duration: {type: Number,min: 0,},
    salary: { type: Number,},
    rating: {
      type: Number,
      max: 5.0,
      default: -1.0,
    },
  },
  { collation: { locale: "en" } }
);

export default mongoose.model("jobs", schema);
