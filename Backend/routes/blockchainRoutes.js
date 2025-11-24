// backend/routes/blockchainRoutes.js
import express from "express";
import { contract, wallet } from "../blockchainLogic/contract.js";
const router = express.Router();
import Drug from "../models/Drug.js";

console.log("Wallet address:", wallet.address);
console.log("Contract address:", contract.target); // v6 uses .target
router.get("/register", async (req, res) => {
  try {
    const tx = await contract.registerUser(1); // Vendor
    const receipt = await tx.wait();
    res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
// -----------------------------
// Add new drug (backend signs)
// POST /api/blockchain/drug/add
// -----------------------------
router.post("/add", async (req, res) => {
  try {
    const { name, quantity, manufactureDate, expiryDate } = req.body;

    if (!name || !quantity || !manufactureDate || !expiryDate) {
      return res.status(400).json({ success: false, error: "Missing params" });
    }

    // Blockchain transaction
    const tx = await contract.addDrug(
      String(name),
      String(quantity),
      String(manufactureDate),
      String(expiryDate)
    );
    const receipt = await tx.wait();
    console.log("TX OBJECT:", tx);
    // Save to MongoDB
    const newDrug = await Drug.create({
      name,
      quantity,
      manufactureDate,
      expiryDate,
      manufacturer: wallet.address,
      currentOwner: wallet.address,
      status: 0,
    });

    return res.json({
      success: true,
      txHash: receipt.transactionHash,
      mongoId: newDrug._id,
    });
  } catch (err) {
    console.error("addDrug error", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -----------------------------
// Get all drugs
// GET /api/blockchain/drug/all
// -----------------------------
router.get("/all", async (req, res) => {
  try {
    const drugs = await Drug.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      drugs: JSON.parse(
        JSON.stringify(drugs, (_, val) =>
          typeof val === "bigint" ? val.toString() : val
        )
      ),
    });
  } catch (err) {
    console.error("Fetch drugs error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// -----------------------------
// Get drug by ID
// GET /api/blockchain/drug/:id
// -----------------------------
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ success: false, error: "Invalid ID" });

    const result = await contract.getDrug(id);

    return res.json({
      success: true,
      drug: {
        id: result[0].toString(),
        name: result[1],
        manufacturer: result[2],
        currentOwner: result[3],
        status: result[4], // enum value
        quantity: result[5], // string now
        manufactureDate: result[6], // string now
        expiryDate: result[7], // string now
      },
    });
  } catch (err) {
    console.error("getDrug error", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
