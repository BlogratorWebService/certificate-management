import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Student from "../models/student.model.js";
import path from "path";
import fs from "fs/promises";

const normalizePublicPath = (filePath) =>
  "/" + filePath.replace("public", "").split(path.sep).join("/");

const deleteFiles = async (paths = []) => {
  for (const path of paths) {
    if (path) {
      try {
        await fs.unlink(path);
      } catch (err) {
        throw new ApiError(500, `Error deleting file at ${path}:`, err.message);
      }
    }
  }
};

const newStudent = asyncHandler(async (req, res) => {
  const { name, courseName, endDate, startDate, registrationNumber } = req.body;

  const certificateFile = req?.files?.certificateFile?.[0]?.path || null;
  const marksheetFile = req?.files?.marksheetFile?.[0]?.path || null;
  const studentPicFile = req?.files?.studentPicFile?.[0]?.path || null;

  const uploadedFiles = [certificateFile, marksheetFile, studentPicFile];

  try {
    if (
      !name ||
      !courseName ||
      !endDate ||
      !startDate ||
      !registrationNumber ||
      !certificateFile ||
      !marksheetFile ||
      !studentPicFile
    ) {
      throw new ApiError(400, "Fill all the required inputs");
    }

    const studentExists = await Student.findOne({ registrationNumber });
    if (studentExists) throw new ApiError(400, "Student already exists");

    if (endDate < startDate)
      throw new ApiError(400, "End date should be greater than start date");

    const baseUrl = `https://backend.gifsind.in`;
    const certificateUrl = `${baseUrl}${normalizePublicPath(certificateFile)}`;
    const marksheetUrl = `${baseUrl}${normalizePublicPath(marksheetFile)}`;
    const studentPicUrl = `${baseUrl}${normalizePublicPath(studentPicFile)}`;

    const student = await Student.create({
      name,
      registrationNumber,
      endDate,
      courseName,
      startDate,
      certificateUrl,
      marksheetUrl,
      studentPicUrl,
    });

    if (!student)
      throw new ApiError(500, "Internal error while creating Student");

    res
      .status(201)
      .json(new ApiResponse(201, student, "Student created successfully!"));
  } catch (error) {
    await deleteFiles(uploadedFiles);
    throw error;
  }
});

// const newStudent = asyncHandler(async (req, res) => {
//   const { name, courseName, endDate, startDate, registrationNumber } = req.body;

//   const certificateArray = req.files?.certificateFile;
//   const certificateFile = certificateArray?.[0]?.path || null;

//   const marksheetArray = req.files?.marksheetFile;
//   const marksheetFile = marksheetArray?.[0]?.path || null;

//   const studentPicArray = req.files?.studentPicFile;
//   const studentPicFile = studentPicArray?.[0]?.path || null;

//   if (
//     !name ||
//     !courseName ||
//     !endDate ||
//     !startDate ||
//     !registrationNumber ||
//     !certificateFile ||
//     !marksheetFile ||
//     !studentPicFile
//   )
//     throw new ApiError(400, "Fill all the required inputs");

//   const studentExists = await Student.findOne({
//     registrationNumber,
//   });

//   if (studentExists) throw new ApiError(400, "Student already exists");
//   if (endDate < startDate)
//     throw new ApiError(400, "End date should be greater than start date");

//   const certificateUrl = await uploadOnCloudinary(certificateFile);
//   if (!certificateUrl)
//     throw new ApiError(500, "Internal error while uploading certificate");
//   const marksheetUrl = await uploadOnCloudinary(marksheetFile);
//   if (!marksheetUrl)
//     throw new ApiError(500, "Internal error while uploading marksheet");

//   const studentPicUrl = await uploadOnCloudinary(studentPicFile);
//   if (!studentPicUrl)
//     throw new ApiError(500, "Internal error while uploading student pic");

//   const student = await Student.create({
//     name,
//     registrationNumber,
//     endDate,
//     courseName,
//     startDate,
//     certificateUrl,
//     marksheetUrl,
//     studentPicUrl,
//   });

//   if (!student)
//     throw new ApiError(500, "Internal error while creating Student");

//   res
//     .status(201)
//     .json(new ApiResponse(201, student, "Student created successfully!"));
// });

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

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({}).sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, students, "Students fetched successfully!"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const registrationNumber = req.params?.registrationNumber;

  if (!registrationNumber) {
    throw new ApiError(401, "Registration number needed");
  }

  const student = await Student.findOne({ registrationNumber });

  if (!student) {
    throw new ApiError(404, "No student found");
  }

  const getPathFromUrl = (url) => {
    const baseUrl = "https://backend.gifsind.in";
    return url?.replace(baseUrl, "");
  };

  const certificatePath = getPathFromUrl(student.certificateUrl);
  const marksheetPath = getPathFromUrl(student.marksheetUrl);
  const studentPicPath = getPathFromUrl(student.studentPicUrl);

  await deleteFiles([
    `./public${certificatePath}`,
    `./public${marksheetPath}`,
    `./public${studentPicPath}`,
  ]);

  await Student.deleteOne({ registrationNumber });

  res
    .status(200)
    .json(new ApiResponse(200, null, "Student deleted successfully."));
});

export { newStudent, getStudent, getAllStudents, deleteStudent };
