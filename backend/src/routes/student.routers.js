import express from "express";
const router = express.Router();
import { newStudent, getStudent } from "../controllers/students.controllers.js";
import checkAuth from "../middlewares/checkAuth.js";
import { upload } from "../middlewares/multer.js";

router.post("/get/:registrationNumber", getStudent);
router.post(
  "/new",
  upload.fields([{ name: "certificateFile" }, { name: "marksheetFile" }]),
  checkAuth,
  newStudent
);

export default router;