import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Student from "../models/student.model.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";

const newStudent = asyncHandler(async (req, res) => {
  const { name, courseName, endDate, startDate, registrationNumber } = req.body;
const certificateFile = req.files.certificateFile[0].path;
const marksheetFile = req.files.marksheetFile[0].path;

  if (
    !name ||
    !courseName ||
    !endDate ||
    !startDate ||
    !registrationNumber ||
    !certificateFile ||
    !marksheetFile
  )
    throw new ApiError(400, "Fill all the required inputs");

  const certificateUrl = await uploadOnCloudinary(certificateFile);
  if (!certificateUrl)
    throw new ApiError(500, "Internal error while uploading certificate");
  const marksheetUrl = await uploadOnCloudinary(marksheetFile);
  if (!marksheetUrl)
    throw new ApiError(500, "Internal error while uploading marksheet");

  const student = await Student.create({
    name,
    registrationNumber,
    endDate,
    courseName,
    startDate,
    certificateUrl,
    marksheetUrl,
  });

  if (!student)
    throw new ApiError(500, "Internal error while creating Student");

  res
    .status(201)
    .json(new ApiResponse(201, student, "Student created successfully!"));
});

const getStudent = asyncHandler(async (req, res) => {
  const registrationNumber = req?.params?.registrationNumber;
  if (!registrationNumber)
    throw new ApiError(400, "Provide registrationNumber");

  const student = await Student.findOne({ registrationNumber });

  if (!student) throw new ApiError(404, "Student not found");
  res
    .status(200)
    .json(new ApiResponse(200, student, "Student fetched successfully!"));
});

export { newStudent, getStudent };