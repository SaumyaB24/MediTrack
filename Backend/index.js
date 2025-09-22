const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

// Correct import for default Prisma Client location
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "test123";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

// Test database connection on startup
async function testDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
        
        await prisma.$queryRaw`SELECT 1`;
        console.log('Database query test passed');
    } catch (error) {
        console.error(' Database connection failed:', error);
        process.exit(1);
    }
}

// Initialize the application
async function initializeApp() {
    await testDatabaseConnection();
    
    // Your routes here
    app.post("/signin", async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            if (password !== user.password) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, JWT_SECRET, { expiresIn: '7d' });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            
            res.json({ 
                message: "Logged in successfully!",
                userId: user.id,
                email: user.email
            });
        } catch (error) {
            console.error("Signin error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.post("/signup", async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return res.status(409).json({ error: "User already exists with this email" });
            }

            const newUser = await prisma.user.create({
                data: {
                    email,
                    password
                }
            });

            const token = jwt.sign({
                id: newUser.id,
                email: newUser.email
            }, JWT_SECRET, { expiresIn: '7d' });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            
            res.status(201).json({ 
                message: "User created successfully!",
                userId: newUser.id,
                email: newUser.email
            });
        } catch (error) {
            console.error("Signup error:", error);
            
            if (error.code === 'P2002') {
                return res.status(409).json({ error: "User already exists with this email" });
            }
            
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.get("/user", async (req, res) => {
        try {
            const token = req.cookies.token;
            
            if (!token) {
                return res.status(401).json({ error: "No token provided" });
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            
            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: {
                    id: true,
                    email: true,
                }
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            
            res.json(user);
        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ error: "Invalid token" });
            }
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expired" });
            }
            console.error("User endpoint error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.post("/logout", (req, res) => {
        res.clearCookie("token");
        res.json({
            message: "Logged out successfully!"
        });
    });

    app.get("/", (req, res) => {
        res.send("Server is running! Use /signin or /signup endpoints.");
    });

    app.get("/health", async (req, res) => {
        try {
            await prisma.$queryRaw`SELECT 1`;
            res.json({ status: "OK", database: "Connected" });
        } catch (error) {
            res.status(500).json({ status: "Error", database: "Disconnected" });
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });
}

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

initializeApp().catch(console.error);