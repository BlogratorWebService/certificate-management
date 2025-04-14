import express from 'express';
const router = express.Router();

import {
    createCertificate, getCertificate
} from "../controllers/certificate.controller.js";

router.post("/create", createCertificate);
router.get("/:certificateId", getCertificate);

export default router;