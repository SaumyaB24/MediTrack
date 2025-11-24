import express from "express";
import Drug from "../models/Drug.js";
import { contract } from "../blockchainLogic/contract.js";
const router = express.Router();

// -----------------------------
// Add new drug (blockchain + DB)
// Endpoint: POST /api/blockchain/drug/add
// -----------------------------
router.post("/add", async (req, res) => {
  try {
    const { name, quantity, manufactureDate, expiryDate, userId } = req.body;

    if (!name || !quantity || !manufactureDate || !expiryDate) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // Call blockchain directly with strings
    const tx = await contract.addDrug(
      name,
      quantity,
      manufactureDate,
      expiryDate
    );
    console.log("TX hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction mined in block:", receipt.blockNumber);

    // Save drug off-chain in MongoDB (store strings)
    const drug = await Drug.create({
      name,
      quantity, // string
      manufactureDate, // string
      expiryDate, // string
      userId,
      txHash: receipt.transactionHash,
    });

    res
      .status(201)
      .json({ success: true, drug, txHash: receipt.transactionHash });
  } catch (err) {
    console.error("Add drug error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// -----------------------------
// Fetch all drugs from DB
// Endpoint: GET /api/blockchain/drug/all
// -----------------------------
router.get("/all", async (req, res) => {
  try {
    const drugs = await Drug.find().sort({ createdAt: -1 });
    res.json({ success: true, drugs });
  } catch (err) {
    console.error("Fetch drugs error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
