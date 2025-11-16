import express from "express";
import Drug from "../models/Drug.js";

const router = express.Router();

// Save drug added on blockchain
router.post("/", async (req, res) => {
  try {
    const drug = await Drug.create(req.body);
    res.status(201).json({ success: true, drug });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
