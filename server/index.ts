import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getSensorReadings,
  getSensorStatus,
  getDevices,
  toggleDevice,
  getSystemStatus,
  controlIrrigation,
  getIrrigationStatus,
  getBlynkStatus,
  getAnalyticsData,
} from "./routes/iot";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from SmartFarm NUST server!" });
  });

  app.get("/api/demo", handleDemo);

  // IoT API routes
  app.get("/api/iot/sensors", getSensorReadings);
  app.get("/api/iot/sensors/status", getSensorStatus);
  app.get("/api/iot/devices", getDevices);
  app.post("/api/iot/devices/:id/toggle", toggleDevice);
  app.get("/api/iot/system/status", getSystemStatus);
  app.post("/api/iot/irrigation/control", controlIrrigation);
  app.get("/api/iot/irrigation/status", getIrrigationStatus);
  app.get("/api/iot/blynk/status", getBlynkStatus);
  app.get("/api/iot/analytics", getAnalyticsData);

  return app;
}
