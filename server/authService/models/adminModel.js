import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
}, { timestamps: true });


const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

