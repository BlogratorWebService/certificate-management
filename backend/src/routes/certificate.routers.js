import express from 'express';
const router = express.Router();
import checkAuth from "../middlewares/checkAuth.js";

import {
    createCertificate, getCertificate
} from "../controllers/certificate.controllers.js";

router.post("/create", checkAuth, createCertificate);
router.get("/get/:certificateId", getCertificate);

export default router;