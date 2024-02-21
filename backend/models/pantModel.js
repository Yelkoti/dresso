import mongoose from "mongoose";

const pantSchema = mongoose.Schema({
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
    type: Number,
    default: null,
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

const Pant = mongoose.model("Pant", pantSchema);

export default Pant;
