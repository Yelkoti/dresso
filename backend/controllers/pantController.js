import asyncHandler from "../middleware/asyncHandler.js";
import Pant from "../models/pantModel.js";

//@desc     Creating Pant Details
//@route    Post /pant
//@access   Private
const addPantDetails = asyncHandler(async (req, res) => {
  const { image, name, description } = req.body;
  const pantExist = await Pant.findOne({ name });
  if (pantExist) {
    res.status(400);
    throw new Error("Pant already exists");
  }
  const pant = await Pant.create({
    image,
    name,
    description,
    user: req.user._id,
  });
  if (pant) {
    res.status(201);
    res.json({
      message: "Pant details added successfully",
    });
  } else {
    res.status(400);
    throw new Error("can't able to add pant details");
  }
});

export {addPantDetails};