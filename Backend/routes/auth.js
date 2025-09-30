const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "test123";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/signup", async (req, res) => {
  const { email, password, name, role, gstNumber, company, region, warehouseId } = req.body;

  try {
    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: "Email, password, name, and role are required" });
    }

    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        vendor: role === "VENDOR" ? { create: { gstNumber, company } } : undefined,
        distributor: role === "DISTRIBUTOR" ? { create: { region, warehouseId } } : undefined,
      },
      include: {
        vendor: true,
        distributor: true
      }
    });

    const token = generateToken(user);
    res.cookie("token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: "User created successfully",
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        name: user.name
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        vendor: true,
        distributor: true
      }
    });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.cookie("token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: "Logged in successfully",
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        name: user.name,
        profile: user.vendor || user.distributor || null
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Protected routes
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        vendor: true,
        distributor: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      user,
      message: "Profile retrieved successfully"
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.put("/profile", authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Admin only route example
router.get("/admin/users", authenticate, authorize(["ADMIN"]), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        vendor: true,
        distributor: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      users,
      count: users.length
    });
  } catch (err) {
    console.error("Admin users error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Vendor only route example
router.get("/vendor/dashboard", authenticate, authorize(["VENDOR"]), async (req, res) => {
  try {
    // Vendor-specific data
    const vendorData = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: "Vendor dashboard data",
      data: vendorData
    });
  } catch (err) {
    console.error("Vendor dashboard error:", err);
    res.status(500).json({ error: "Failed to fetch vendor data" });
  }
});

// Distributor only route example
router.get("/distributor/dashboard", authenticate, authorize(["DISTRIBUTOR"]), async (req, res) => {
  try {
    // Distributor-specific data
    const distributorData = await prisma.distributor.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: "Distributor dashboard data",
      data: distributorData
    });
  } catch (err) {
    console.error("Distributor dashboard error:", err);
    res.status(500).json({ error: "Failed to fetch distributor data" });
  }
});

router.get("/supply-chain/data", authenticate, authorize(["VENDOR", "DISTRIBUTOR", "ADMIN"]), async (req, res) => {
  try {
    res.json({
      message: "Supply chain data accessible to vendors, distributors, and admins",
      userRole: req.user.role,
      data: {
      }
    });
  } catch (err) {
    console.error("Supply chain data error:", err);
    res.status(500).json({ error: "Failed to fetch supply chain data" });
  }
});

router.post("/logout", authenticate, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  
  res.json({ 
    message: "Logged out successfully",
    user: null 
  });
});

router.get("/verify", authenticate, (req, res) => {
  res.json({
    valid: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      name: req.user.name
    }
  });
});

module.exports = router;