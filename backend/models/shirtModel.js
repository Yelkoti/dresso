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
  note: {
    type: String,
  },
  usedOn: {
    type: Number,
    default: "",
  },
  isWashed: {
    type: Boolean,
    default: true,
  },
  use: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 2,
  },
});

const Shirt = mongoose.model("Shirt", shirtSchema);

export default Shirt;
