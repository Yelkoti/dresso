import asyncHandler from "../middleware/asyncHandler.js";
import Shirt from "../models/shirtModel.js";

//@desc     Creating Shirt Details
//@route    Post /shirt
//@access   Private
const addShirtDetails = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body;
  const shirtExist = await Shirt.findOne({ name });
  if (shirtExist) {
    res.status(400);
    throw new Error("Shirt already exists");
  }
  const shirt = await Shirt.create({
    name,
    image,
    description,
    user: req.user._id,
  });
  if (shirt) {
    res.status(201);
    res.json({
      message: "Shirt details added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Can't able to add shirt details");
  }
});

export { addShirtDetails };