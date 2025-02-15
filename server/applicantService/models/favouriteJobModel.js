import mongoose from 'mongoose';

const favouriteJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  }
}, {
  timestamps: true
});

const FavouriteJob = mongoose.model('FavouriteJob', favouriteJobSchema);

export default FavouriteJob;