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

//@desc     Get all pant details
//@route    GET /pant
//@access   Private
const getAllPantDetails = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const pants = await Pant.find({ user });
  if (pants) {
    res.status(200);
    res.json(pants);
  } else {
    res.status(404);
    throw new Error("Resource not Found");
  }
});

//@desc     Update pant details
//@route    PUT /pant/:id
//@access   Private
const updatePantDetails = asyncHandler(async (req, res) => {
  const pantId = req.params.id;
  const pant = await Pant.findOne({ _id: pantId });
  if (!pant) {
    res.status(404);
    throw new Error("The Pant you are looking for is not available");
  }
  if (req.body.name) {
    pant.name = req.body.name;
    const result = await pant.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Pant name",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update pant name");
    }
  } else if (req.body.description) {
    pant.description = req.body.description;
    const result = await pant.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Pant description",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update pant description");
    }
  } else if (req.body.image) {
    pant.image = req.body.image;
    const result = await pant.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Pant image",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update pant image");
    }
  } else if (req.body.toggle) {
    pant.use = !pant.use;
    pant.isWashed = !pant.isWashed;
    pant.usedOn = pant.usedOn === null ? Date.now() : null;
    const result = await pant.save();
    if (result) {
      res.status(200);
      res.json({
        message: `Marked pant as ${pant.isWashed ? "washed" : "used"}`,
      });
    } else {
      res.status(400);
      throw new Error(
        `Can't able to mark pant as ${pant.isWashed ? "washed" : "used"}`
      );
    }
  } else if (req.body.limit) {
    pant.limit = req.body.limit;
    const result = await pant.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Pant limit",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update pant limit");
    }
  }
});

//@desc     Get pant details by pantId
//@route    GET /pant/:id
//@access   Private
const getPantDetails = asyncHandler(async (req, res) => {
  const pantId = req.params.id;
  const pant = await Pant.findById({ _id: pantId });
  if (!pant) {
    res.status(404);
    throw new Error("Pant Details not Found");
  }
  res.status(200);
  res.json(pant);
});

export { addPantDetails, getAllPantDetails, updatePantDetails, getPantDetails };
