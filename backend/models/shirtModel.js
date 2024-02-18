import mongoose from "mongoose";

const shirtSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  usedOn: {
    type: Date,
    default: "",
  },
  isWashed: {
    type: Boolean,
    default: true,
  },
  canWear: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
    default: 2,
  },
});

const Shirt = mongoose.model("Shirt", shirtSchema);

export default Shirt;