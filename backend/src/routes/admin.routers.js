import express from "express";
const router = express.Router();
import { adminLogin, adminRegister, getAdmin } from "../controllers/admin.controllers.js";
import checkAuth from "../middlewares/checkAuth.js";


router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/me", checkAuth, getAdmin);
export default router;