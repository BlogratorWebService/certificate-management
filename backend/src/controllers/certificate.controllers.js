import asyncHandler from "../utils/asyncHandler.js";
import Certificate from "../models/certificate.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getCertId from "../utils/getCertId.js";

const createCertificate = asyncHandler(async (req, res) => {
  const { fullname, description, endDate, startDate } = req.body;
  if (!fullname || !description || !endDate || !startDate)
    throw new ApiError(400, "Fill all the required inputs");

  const certificateId = getCertId(startDate);
  if (!certificateId)
    throw new ApiError(500, "Internal error while generating certificate ID");

  const certificate = await Certificate.create({
    certificateId,
    fullname,
    description,
    endDate,
    startDate,
  });

  if (!certificate)
    throw new ApiError(500, "Internal error while creating certificate");

  res
    .status(201)
    .json(
      new ApiResponse(201, certificate, "Certificate created successfully!")
    );
});

const getCertificate = asyncHandler(async (req, res) => {
  const certificateId = req?.params?.certificateId;
  if (!certificateId) throw new ApiError(400, "Provide certificate ID");

  const cert = await Certificate.findOne({ certificateId });
  if (!cert) throw new ApiError(404, "Certificate not found");
  res
    .status(200)
    .json(new ApiResponse(200, cert, "Certificate fetched successfully!"));
});

export { createCertificate, getCertificate };