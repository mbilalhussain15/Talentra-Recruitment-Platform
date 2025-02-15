import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const schema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      unique: true, 
      lowercase: true, 
      required: true, 
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
    },
    password: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["admin", "recruiter", "applicant"], 
      required: true 
    },
  },
  { collation: { locale: "en" } }
);

schema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});


const UserAuth = mongoose.model("UserAuth", schema);
export default UserAuth;

