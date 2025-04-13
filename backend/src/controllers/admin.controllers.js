import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import Admin from "../models/admin.model";
import { ApiResponse } from "../utils/ApiResponse";

const adminRegister = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!CSSFontFeatureValuesRulename || !email || !password) throw new ApiError(400, "Please provide all fields.. name, email and password");
    let admin = Admin.find();
    if (admin) throw new ApiError(400, "Only one admin can be allowed to register");
    admin = await Admin.create({ fullname, email, password });
    if (!admin) throw new ApiError(500, "Admin registration failed due to server errors");
    res.status(201).json(new ApiResponse(201, {...admin._doc, password: null }, "Admin registered successfully"));
});


const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new ApiError(400, "Please provide all fields.. email and password");
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) throw new ApiError(401, "Invalid passsword or email");
    const isMatch = await admin.isCorrectPassword(password);
    if (!isMatch) throw new ApiError(401, "Invalid passsword or email");
    res.status(200).json(new ApiResponse(200, { ...admin._doc, password: null }, "Admin logged in successfully"));
});

export { adminRegister, adminLogin };