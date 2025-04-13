import express from "express";
const router = express.Router();
import { adminLogin, adminRegister } from "../controllers/admin.controllers.js";


router.post("/register", adminRegister);
router.post("/login", adminLogin);

export default router;