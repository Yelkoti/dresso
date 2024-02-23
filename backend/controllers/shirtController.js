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

//@desc     Get all shirt details
//@route    GET /shirt
//@access   Private
const getAllShirtDetails = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const shirts = await Shirt.find({ user });
  if (shirts) {
    res.status(200);
    res.json(shirts);
  } else {
    res.status(404);
    throw new Error("Resource not Found");
  }
});

//@desc     Update shirt details
//@route    PUT /shirt/:id
//@access   Private
const updateShirtDetails = asyncHandler(async (req, res) => {
  const shirtId = req.params.id;
  const shirt = await Shirt.findOne({ _id: shirtId });
  if (!shirt) {
    res.status(404);
    throw new Error("The Shirt you are looking for is not available");
  }
  if (req.body.name) {
    shirt.name = req.body.name;
    const result = await shirt.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Shirt name",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update shirt name");
    }
  } else if (req.body.description) {
    shirt.description = req.body.description;
    const result = await shirt.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Shirt description",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update shirt description");
    }
  } else if (req.body.note) {
    shirt.note = req.body.note;
    const result = await shirt.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Shirt note",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update shirt note");
    }
  } else if (req.body.image) {
    shirt.image = req.body.image;
    const result = await shirt.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Shirt image",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update shirt image");
    }
  } else if (req.body.toggle) {
    shirt.use = !shirt.use;
    shirt.isWashed = !shirt.isWashed;
    shirt.usedOn = shirt.usedOn === null ? Date.now() : null;
    const result = await shirt.save();
    if (result) {
      res.status(200);
      res.json({
        message: `Marked shirt as ${shirt.isWashed ? "washed" : "used"}`,
      });
    } else {
      res.status(400);
      throw new Error(
        `Can't able to mark shirt as ${shirt.isWashed ? "washed" : "used"}`
      );
    }
  } else if (req.body.limit) {
    shirt.limit = req.body.limit;
    const result = await shirt.save();
    if (result) {
      res.status(200);
      res.json({
        message: "Updated Shirt limit",
      });
    } else {
      res.status(400);
      throw new Error("Can't able to update shirt limit");
    }
  }
});

//@desc     Get shirt details by shirtId
//@route    GET /shirt/:id
//@access   Private
const getShirtDetails = asyncHandler(async (req, res) => {
  const shirtId = req.params.id;
  const shirt = await Shirt.findById({ _id: shirtId });
  if (!shirt) {
    res.status(404);
    throw new Error("Shirt Details not Found");
  }
  res.status(200);
  res.json(shirt);
});

//@desc    Delete the shirt by ID
//@route   Delete /shirt/:id
//@access  Private
const deleteShirtDetails = asyncHandler(async (req, res) => {
  const shirtId = req.params.id;
  const shirt = await Shirt.findOne({ _id: shirtId });
  if (shirt) {
    await shirt.deleteOne();
    res.status(200);
    res.json({
      message: "Deleted shirt details",
    });
  } else {
    res.status(400);
    throw new Error("Can't able to find shirt details");
  }
});

export {
  addShirtDetails,
  getAllShirtDetails,
  updateShirtDetails,
  getShirtDetails,
  deleteShirtDetails,
};
