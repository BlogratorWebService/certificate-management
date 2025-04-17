import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";

const checkAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = jwt.decode(token, process.env.JWT_SECRET);

  const admin = await Admin.findOne({ _id: decoded });

  if (!admin) throw new ApiError(401, "Invalid credentials");

  next();
});

export default checkAuth;
