import express from "express";
const app = express();
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

import adminRouters from "./routes/admin.routers.js";
import certificateRouters from "./routes/certificate.routers.js";

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}));


app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});

app.use("/api/v1/admin", adminRouters);
app.use("/api/v1/cert", certificateRouters);

app.use(globalErrorHandler);

export {app};