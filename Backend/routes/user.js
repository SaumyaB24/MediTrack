const express = require("express");
const prisma = require("../prismaClient");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.get("/user", authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        vendor: { select: { gstNumber: true, company: true } },
        distributor: { select: { region: true, warehouseId: true } }
      }
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;