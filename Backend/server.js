import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import drugRoutes from "./routes/drugRoutes.js"; // optional, for off-chain DB
import transferRoutes from "./routes/transferRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blockchainRoutes from "./routes/blockchainRoutes.js";

dotenv.config();

const app = express();

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());

// ---------- Connect to MongoDB ----------
connectDB()
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------- API Routes ----------
// Blockchain-based drug operations
BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use("/api/blockchain/drug", blockchainRoutes);

// Optional off-chain drug DB routes
app.use("/api/drugs", drugRoutes);

// Transfers and users
app.use("/api/transfers", transferRoutes);
app.use("/api/users", userRoutes);

// ---------- Root endpoint ----------
app.get("/", (req, res) => {
  res.send("MediTrack Backend Running 🚀");
});

// ---------- Start server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
