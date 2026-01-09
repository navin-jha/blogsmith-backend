import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// configure middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Importing routes
import { healthCheckRoute } from "./routes/index.js";

// configure routes
app.use("/api/v1/health-check", healthCheckRoute);

export default app;
