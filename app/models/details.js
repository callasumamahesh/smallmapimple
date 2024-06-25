import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  direction: {
    type: String,
    required: true
  }
});

const userLocation = mongoose.models.userLocation || mongoose.model('userLocation', detailsSchema);
export default userLocation;
