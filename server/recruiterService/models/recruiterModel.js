import mongoose from 'mongoose';
 
let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { collation: { locale: "en" } }
);
 
 
const Recruiter = mongoose.model("RecruiterModel", schema);
export default Recruiter;