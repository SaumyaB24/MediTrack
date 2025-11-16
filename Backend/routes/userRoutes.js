import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Create user (signup)
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user details by ethAddress
router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ ethAddress: req.query.ethAddress });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
