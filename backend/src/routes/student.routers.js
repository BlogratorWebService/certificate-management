import express from "express";
const router = express.Router();
import {
  newStudent,
  getStudent,
  getAllStudents,
} from "../controllers/students.controllers.js";
import checkAuth from "../middlewares/checkAuth.js";
import { upload } from "../middlewares/multer.js";

router.get("/get/:registrationNumber", getStudent);
router.get("/all", checkAuth, getAllStudents);
router.post(
  "/new",
  upload.fields([{ name: "certificateFile" }, { name: "marksheetFile" }, { name: "studentPicFile" }]),
  checkAuth,
  newStudent
);

export default router;