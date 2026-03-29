import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import myRouter from "./router/routes.v1";
import { pool } from "./helper/db";
import client from "prom-client"; // 1. Import prom-client

const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

const app: Application = express();
const PORT = process.env.API_PORT;

// --- Prometheus Setup ---
const register = new client.Registry();

// Add default metrics (CPU, RAM, etc.)
client.collectDefaultMetrics({ register });

// 2. Custom Metric for Acknowledgments
export const acknowledgmentsCounter = new client.Counter({
  name: "total_events_acknowledged",
  help: "Total number of events successfully acknowledged by moderators",
  labelNames: ["region"],
});
register.registerMetric(acknowledgmentsCounter);

// --- DB Connection ---
async function testDBConnection() {
  try {
    const dbClient = await pool.connect();
    console.log("Successfully connected to the database!");
    dbClient.release();
  } catch (err: any) {
    console.error("Database connection error:", err.stack);
  }
}
testDBConnection();

// --- Middleware ---
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms [:date[clf]]",
  ),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Metrics Endpoint ---
app.get("/metrics", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// --- Routes ---
app.use("/api", myRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
