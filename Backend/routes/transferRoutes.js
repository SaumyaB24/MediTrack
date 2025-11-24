import express from "express";
import Transfer from "../models/Transfer.js";
import { contract } from "../blockchainLogic/contract.js";

const router = express.Router();

// Transfer drug (blockchain + backend)
router.post("/", async (req, res) => {
  const { drugId, toAddress } = req.body;

  if (drugId === undefined || !toAddress) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    const id = Number(drugId);
    if (isNaN(id) || id < 0) throw new Error("Drug ID must be a valid number");

    // --- 1️⃣ Transfer on blockchain ---
    const tx = await contract.transferDrug(id, toAddress);
    const receipt = await tx.wait();

    // --- 2️⃣ Save transfer in backend ---
    const transfer = await Transfer.create({
      drugId: id,
      toAddress,
      txHash: receipt.transactionHash,
    });

    res
      .status(201)
      .json({ success: true, transfer, txHash: receipt.transactionHash });
  } catch (err) {
    console.error("Transfer error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
