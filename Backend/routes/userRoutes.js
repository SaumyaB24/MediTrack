import express from "express";
import User from "../models/User.js";
import { contract } from "../blockchainLogic/contract.js";

const router = express.Router();

// -----------------------------
// Create user (signup)
// POST /api/user/signup
// -----------------------------
router.post("/signup", async (req, res) => {
  try {
    const { ethAddress, role, name, email, phone, license } = req.body;

    if (!ethAddress || !role) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Convert role to enum value for smart contract
    // 1 = Vendor, 2 = Distributor
    let roleId;
    if (role.toLowerCase() === "vendor") roleId = 1;
    else if (role.toLowerCase() === "distributor") roleId = 2;
    else return res.status(400).json({ success: false, error: "Invalid role" });

    // --- 1️⃣ Register on blockchain ---
    const tx = await contract.registerUser(roleId);
    const receipt = await tx.wait();

    // --- 2️⃣ Save user off-chain in DB ---
    const user = await User.create({
      ethAddress,
      role,
      name,
      email,
      phone,
      license,
      txHash: receipt.transactionHash,
    });

    res
      .status(201)
      .json({ success: true, user, txHash: receipt.transactionHash });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// -----------------------------
// Get user by ethAddress
// GET /api/user/:ethAddress
// -----------------------------
router.get("/:ethAddress", async (req, res) => {
  try {
    const { ethAddress } = req.params;
    if (!ethAddress) {
      return res
        .status(400)
        .json({ success: false, error: "Missing ethAddress" });
    }

    const user = await User.findOne({ ethAddress });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
