import express from "express";
import Transfer from "../models/Transfer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const transfer = await Transfer.create(req.body);
    res.status(201).json({ success: true, transfer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
