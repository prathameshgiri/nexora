import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import { handleDemo } from "./routes/demo";
import auth from "./routes/auth";
import salarySlips from "./routes/salary-slips";
import intelligence from "./routes/intelligence";
import backups from "./routes/backups";
import { resourceRoutes } from "./routes/resources";
import { ensureDatabase } from "./utils/json-db";
import { seedDatabase } from "./utils/seed";
import { errorHandler } from "./middleware/errors";

export function createServer() {
  const app = express();
  app.disable("x-powered-by");
  // app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: config.clientOrigin, credentials: true }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false }));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  void ensureDatabase().then(seedDatabase).catch(error => console.error("Database initialization failed", error));

  app.get("/api/ping", (_req, res) => res.json({ message: process.env.PING_MESSAGE ?? "ping" }));
  app.get("/api/demo", handleDemo);
  app.use("/api/auth", auth);
  app.use("/api/salary-slips", salarySlips);
  app.use("/api", intelligence);
  app.use("/api/backups", backups);

  for (const resource of ["users", "salary", "income", "expenses", "categories", "budgets", "savings", "goals", "loans", "investments", "taxes", "notifications", "support-tickets", "audit-logs", "roles", "permissions", "settings", "admin"]) app.use(`/api/${resource}`, resourceRoutes(resource));
  app.use("/api/support", resourceRoutes("support-tickets"));
  app.use(errorHandler);
  return app;
}

// Trigger nodemon restart
