import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";

//@desc     Auth user and get token
//@route    Post /users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    else {
        res.status(404);
        throw new Error("Invalid email or password");
    }
});

//@desc     Auth user and get token
//@route    Post /users
//@access   Public
const userRegisteration = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({email});
    if(userExist) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


export { authUser, userRegisteration };